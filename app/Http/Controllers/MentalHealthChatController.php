<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MentalHealthChatController extends Controller
{
    /**
     * Handle the incoming request for mental health chat.
     */
    /**
     * Mendapatkan daftar model Gemini yang tersedia
     */
    private function getAvailableModels()
    {
        $apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));
        $listModelsEndpoint = 'https://generativelanguage.googleapis.com/v1/models?key=' . $apiKey;
        
        try {
            $response = Http::get($listModelsEndpoint);
            
            if ($response->successful()) {
                $models = $response->json('models', []);
                $availableModels = [];
                
                // Filter model yang mendukung generateContent
                foreach ($models as $model) {
                    if (isset($model['name']) && 
                        isset($model['supportedGenerationMethods']) && 
                        in_array('generateContent', $model['supportedGenerationMethods'])) {
                        $availableModels[] = $model['name'];
                    }
                }
                
                return $availableModels;
            }
            
            Log::error('Gagal mendapatkan daftar model: ' . $response->body());
            return [];
        } catch (\Exception $e) {
            Log::error('Error saat mengambil daftar model: ' . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Memilih model terbaik yang tersedia
     */
    private function selectBestModel($availableModels)
    {
        // Daftar model berdasarkan prioritas (dari yang paling stabil)
        $preferredModels = [
            'models/gemini-1.0-pro',
            'models/gemini-pro',
            'models/gemini-1.5-pro',
            'models/gemini-1.0-pro-vision',
            'models/gemini-pro-vision',
            'models/gemini-1.5-flash',
            'models/gemini-flash'
        ];
        
        // Pilih model berdasarkan prioritas
        foreach ($preferredModels as $model) {
            if (in_array($model, $availableModels)) {
                return $model;
            }
        }
        
        // Jika tidak ada model yang cocok dengan preferensi, gunakan model pertama yang tersedia
        return !empty($availableModels) ? $availableModels[0] : null;
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'history' => 'nullable|array',
        ]);

        $message = $request->input('message');
        $history = $request->input('history', []);

        try {
            // Personalisasi untuk model Gemini sebagai praktisi kesehatan mental
            $systemPrompt = "Kamu adalah teman yang baik dan pendengar yang empati. Berbicaralah dengan natural dan santai seperti percakapan sehari-hari antara dua teman. Hindari format formal seperti daftar tips atau saran yang terstruktur.

            Beberapa panduan untuk percakapan:
            - Gunakan bahasa yang hangat dan personal
            - Berikan respons singkat dan to the point (maksimal 3-4 kalimat)
            - Dengarkan dengan empati dan pahami perasaan lawan bicara
            - Tawarkan perspektif baru dengan lembut, bukan menggurui
            - Berbagi pengalaman atau pandangan yang menenangkan
            - Hindari jargon psikologi atau bahasa yang terlalu formal
            
            Ingat, kamu sedang mengobrol santai dengan teman yang butuh dukungan, bukan memberikan konsultasi formal.";

            // Menyiapkan pesan untuk API Gemini/OpenAI sesuai format yang benar
            $contents = [];
            
            // Konfigurasi untuk AI API
            $aiApiKey = env('AI_API_KEY');
            $aiBaseUrl = env('AI_BASE_URL');
            $aiModel = env('AI_MODEL');

            if ($aiApiKey && $aiBaseUrl) {
                // Format OpenAI/Sumopod
                $contents[] = [
                    'role' => 'system',
                    'content' => $systemPrompt
                ];
                
                foreach ($history as $msg) {
                    $contents[] = [
                        'role' => $msg['role'] === 'user' ? 'user' : 'assistant',
                        'content' => $msg['content']
                    ];
                }
                
                $contents[] = [
                    'role' => 'user',
                    'content' => $message
                ];
            } else {
                // Format Gemini
                $contents[] = [
                    'role' => 'user',
                    'parts' => [['text' => $systemPrompt]]
                ];
                
                foreach ($history as $msg) {
                    $contents[] = [
                        'role' => $msg['role'] === 'user' ? 'user' : 'model',
                        'parts' => [['text' => $msg['content']]]
                    ];
                }
                
                $contents[] = [
                    'role' => 'user',
                    'parts' => [['text' => $message]]
                ];
            }

            // 130: Konfigurasi untuk AI API
            $aiApiKey = env('AI_API_KEY');
            $aiBaseUrl = env('AI_BASE_URL');
            $aiModel = env('AI_MODEL');

            if ($aiApiKey && $aiBaseUrl) {
                // Gunakan Sumopod/OpenAI Format
                $endpoint = rtrim($aiBaseUrl, '/') . '/chat/completions';
                
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $aiApiKey,
                    'Content-Type' => 'application/json',
                ])->post($endpoint, [
                    'model' => $aiModel ?: 'gpt-4o', // Model default untuk Sumopod
                    'messages' => $contents, // $contents sudah berisi riwayat + prompt
                    'temperature' => 0.7,
                ]);
            } else {
                // Gunakan Gemini asli (Fallback)
                $apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));
                
                // Dapatkan model yang tersedia dan pilih yang terbaik
                $availableModels = $this->getAvailableModels();
                $selectedModel = $this->selectBestModel($availableModels);
                
                if (!$selectedModel) {
                    Log::error('Tidak ada model Gemini yang tersedia');
                    return response()->json(['error' => 'Tidak ada model AI yang tersedia saat ini'], 500);
                }
                
                $endpoint = 'https://generativelanguage.googleapis.com/v1/' . $selectedModel . ':generateContent';
                
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                ])->post($endpoint . '?key=' . $apiKey, [
                    'contents' => $contents,
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 800,
                    ],
                ]);
            }

            if ($response->successful()) {
                $responseData = $response->json();
                
                if ($aiApiKey && $aiBaseUrl) {
                    // Parsing format OpenAI
                    $aiResponse = $responseData['choices'][0]['message']['content'] ?? 'Maaf, saya tidak dapat memproses respons saat ini.';
                } else {
                    // Parsing format Gemini
                    $aiResponse = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? 'Maaf, saya tidak dapat memproses respons saat ini.';
                }
                
                return response()->json([
                    'response' => $aiResponse
                ]);
            } else {
                Log::error('Gemini API Error: ' . $response->body());
                return response()->json([
                    'response' => 'Maaf, terjadi kesalahan saat berkomunikasi dengan asisten AI. Silakan coba lagi nanti.'
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Mental Health Chat Error: ' . $e->getMessage());
            return response()->json([
                'response' => 'Maaf, terjadi kesalahan internal. Silakan coba lagi nanti.'
            ], 500);
        }
    }
}