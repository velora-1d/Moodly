import { SVGAttributes } from 'react';

import { HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLSpanElement>) {
    return (
        <div
            {...props}
            className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 ${
                props.className || 'h-9 w-9'
            }`}
        >
            <span className="text-lg font-black text-white">M</span>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-teal-400"></div>
        </div>
    );
}
