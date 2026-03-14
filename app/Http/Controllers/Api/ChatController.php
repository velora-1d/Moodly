<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChatSession;
use App\Models\ChatMessage;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $sessions = ChatSession::where('user_id', $request->user()->id)
            ->orderBy('updated_at', 'desc')
            ->get();
        return response()->json($sessions);
    }

    public function store(Request $request)
    {
        $session = ChatSession::create([
            'user_id' => $request->user()->id,
            'title' => 'Sesi Baru ' . now()->format('d M H:i'),
        ]);
        return response()->json($session);
    }

    public function show(Request $request, $sessionId)
    {
        $session = ChatSession::where('user_id', $request->user()->id)
            ->findOrFail($sessionId);
        
        return response()->json($session->messages);
    }

    public function sendMessage(Request $request, $sessionId)
    {
        $session = ChatSession::where('user_id', $request->user()->id)
            ->findOrFail($sessionId);

        // 1. Simpan pesan User
        $userMsg = $session->messages()->create([
            'role' => 'user',
            'content' => $request->input('content'),
        ]);

        // 2. Siapkan Context untuk AI (ambil 10 pesan terakhir agar hemat token)
        $history = $session->messages()
            ->orderBy('id', 'desc')
            ->take(10)
            ->get()
            ->reverse()
            ->map(function ($msg) {
                return [
                    'role' => $msg->role === 'assistant' ? 'assistant' : 'user',
                    'content' => $msg->content
                ];
            })
            ->values()
            ->toArray();

        // System Prompt (Cleaned)
        $systemPrompt = [
            'role' => 'system', 
            'content' => "Kamu adalah Moodly AI, asisten kesehatan mental yang empatik, suportif, dan profesional. Gunakan bahasa Indonesia yang hangat dan menenangkan. Jangan memberikan diagnosis medis, tapi berikan saran praktis dan dukungan emosional. Jika pengguna terdengar dalam bahaya, sarankan untuk menghubungi profesional."
        ];

        // Gabungkan
        $messages = array_merge([$systemPrompt], $history);

        // 3. Panggil GROQ API (Direct)
        // Updated valid models as of Dec 2025
        $models = [
            'llama-3.3-70b-versatile', 
            'llama-3.1-8b-instant',
            'mixtral-8x7b-32768',
        ];

        $botContent = null;
        $attemptedErrors = [];

        foreach ($models as $model) {
            try {
                $apiKey = env('GROQ_API_KEY');
                
                $response = \Illuminate\Support\Facades\Http::withOptions([
                    'verify' => false, 
                ])->withHeaders([
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                ])->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $model,
                    'messages' => $messages,
                    'temperature' => 0.7,
                    'max_tokens' => 1024,
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $botContent = $data['choices'][0]['message']['content'] ?? null;
                    if ($botContent) break; // Success!
                } else {
                    $errorBody = $response->body();
                    $attemptedErrors[] = $model . ' (' . $response->status() . '): ' . $errorBody;
                    \Illuminate\Support\Facades\Log::error("Groq Error [$model]: " . $errorBody);
                }
            } catch (\Exception $e) {
                $attemptedErrors[] = $model . ': ' . $e->getMessage();
            }
        }

        // FALLBACK: Rules Based (Jika AI mati/error, pakai ini)
        if (!$botContent) {
            \Illuminate\Support\Facades\Log::error('All Groq models failed. Switching to Rule-Based. Summary: ' . implode(' | ', $attemptedErrors));
            $botContent = $this->getRuleBasedResponse($request->input('content'));
        }

        // 4. Simpan pesan Bot
        $botMsg = $session->messages()->create([
            'role' => 'assistant',
            'content' => $botContent,
        ]);

        $session->touch(); 

        return response()->json([$userMsg, $botMsg]);
    }

    private function getRuleBasedResponse($input)
    {
        $input = strtolower($input);
        
        $rules = [
            ['keywords' => ['halo', 'hi', 'hai', 'pagi', 'siang', 'malam'], 'response' => "Halo! 👋 Aku Moodly Assistant. Aku di sini untuk mendengarkan. Bagaimana perasaanmu hari ini?"],
            ['keywords' => ['sedih', 'nangis', 'kecewa', 'sakit', 'duka'], 'response' => "Aku turut sedih mendengarnya. 😔 Perasaan itu wajar dan valid. Mau ceritakan lebih lanjut apa yang membuatmu merasa begitu? Aku siap mendengarkan tanpa menghakimi."],
            ['keywords' => ['cemas', 'takut', 'panik', 'gugup', 'anxiety'], 'response' => "Tarik napas dalam-dalam... 🌿 Coba teknik 4-7-8: Tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik. Kamu aman di sini. Apa yang memicu rasa cemasmu?"],
            ['keywords' => ['stress', 'stres', 'bingung', 'capek', 'lelah'], 'response' => "Sepertinya kamu sedang memikul beban berat ya. 🍵 Jangan lupa istirahat sejenak. Kadang istirahat singkat bisa menjernihkan pikiran. Mau bahas apa yang paling membebanimu?"],
            ['keywords' => ['senang', 'bahagia', 'semangat', 'happy'], 'response' => "Wah, ikut senang mendengarnya! 🎉 Energi positif itu menular. Apa hal baik yang terjadi hari ini?"],
            ['keywords' => ['terima kasih', 'makasih', 'thanks'], 'response' => "Sama-sama! 💜 Senang bisa menemanimu. Ingat, kamu berharga."],
            ['keywords' => ['siapa kamu', 'robot', 'bot'], 'response' => "Aku Moodly AI, teman virtualmu untuk ngobrol soal kesehatan mental. Aku mesin, tapi aku peduli! 🤖✨"],
        ];

        foreach ($rules as $rule) {
            foreach ($rule['keywords'] as $keyword) {
                if (str_contains($input, $keyword)) {
                    return $rule['response'];
                }
            }
        }

        return "Aku mengerti. Ceritakan lebih banyak, aku di sini untuk mendengarkan. 🌿 (PS: Saat ini koneksi ke otak AI-ku sedang istirahat, jadi aku menjawab dengan mode dasar, tapi aku tetap peduli!)";
    }
}
