import { SVGAttributes } from 'react';

import { HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span {...props} className={`text-3xl font-black tracking-tighter italic drop-shadow-sm ${props.className || ''}`} style={{ background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
            Moodly.
        </span>
    );
}
