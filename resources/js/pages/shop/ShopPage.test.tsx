import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShopPage from './index';
import { vi, describe, it, expect } from 'vitest';

// Mock Inertia
vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    Link: ({ children, ...props }: unknown) => <a {...props}>{children}</a>,
    usePage: () => ({
        url: '/shop',
        props: {
            auth: {
                user: { name: 'Test User', avatar: 'https://placehold.co/400' }
            }
        }
    })
}));

// Mock DashboardTopNav to avoid complex rendering
vi.mock('@/components/dashboard-top-nav', () => ({
    default: () => <nav data-testid="top-nav">Top Nav</nav>
}));

// Mock Framer Motion to render children immediately
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: unknown) => <div {...props}>{children}</div>,
        button: ({ children, ...props }: unknown) => <button {...props}>{children}</button>,
        span: ({ children, ...props }: unknown) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: unknown) => <>{children}</>,
}));

// Mock Sonner toast
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        info: vi.fn(),
    }
}));

describe('ShopPage', () => {
    it('renders shop items and handles purchase flow', async () => {
        // Basic render check
        const { container } = render(<ShopPage />);
        expect(container).toBeTruthy();

        // Check if products are rendered
        expect(screen.getByText('Mood Journal Pro')).toBeTruthy();
        expect(screen.getByText('Breathing Pack')).toBeTruthy();

        // Find the first "Beli" button
        const buyButtons = screen.getAllByText('Beli');
        expect(buyButtons.length).toBeGreaterThan(0);

        const firstBuyBtn = buyButtons[0];

        // Click "Beli"
        fireEvent.click(firstBuyBtn);

        // Floating Cart Button should appear (cart.length > 0)
        await waitFor(() => {
            expect(screen.queryByText('1')).toBeTruthy();
        });

        const badge = screen.getByText('1');
        const floatingBtn = badge.closest('button');
        expect(floatingBtn).toBeTruthy();

        if (floatingBtn) {
            fireEvent.click(floatingBtn);
        }

        // Cart Drawer should be visible
        expect(screen.getByText('Keranjang Belanja')).toBeTruthy();

        // Click "Checkout Sekarang"
        const checkoutBtn = screen.getByText('Checkout Sekarang');
        fireEvent.click(checkoutBtn);

        // After timeout, success modal should appear
        await waitFor(() => {
            expect(screen.getByText('Pembayaran Berhasil!')).toBeTruthy();
        }, { timeout: 1500 });
    });
});
