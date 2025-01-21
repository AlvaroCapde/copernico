export default function getRandomHexColor() {
    const colors = {
        red: {
            '200': '#fecaca',
            '300': '#fca5a5',
            '400': '#f87171',
            '500': '#ef4444',
            '600': '#dc2626'
        },
        orange: {
            '200': '#fed7aa',
            '300': '#fdba74',
            '400': '#fb923c',
            '500': '#f97316',
            '600': '#ea580c'
        },
        amber: {
            '200': '#fde68a',
            '300': '#fcd34d',
            '400': '#fbbf24',
            '500': '#f59e0b',
            '600': '#d97706'
        },
        yellow: {
            '200': '#fef08a',
            '300': '#fde047',
            '400': '#facc15',
            '500': '#eab308',
            '600': '#ca8a04'
        },
        lime: {
            '200': '#d9f99d',
            '300': '#bef264',
            '400': '#a3e635',
            '500': '#84cc16',
            '600': '#65a30d'
        },
        green: {
            '200': '#bbf7d0',
            '300': '#86efac',
            '400': '#4ade80',
            '500': '#22c55e',
            '600': '#16a34a'
        },
        emerald: {
            '200': '#a7f3d0',
            '300': '#6ee7b7',
            '400': '#34d399',
            '500': '#10b981',
            '600': '#059669'
        },
        teal: {
            '200': '#99f6e4',
            '300': '#5eead4',
            '400': '#2dd4bf',
            '500': '#14b8a6',
            '600': '#0d9488'
        },
        cyan: {
            '200': '#a5f3fc',
            '300': '#67e8f9',
            '400': '#22d3ee',
            '500': '#06b6d4',
            '600': '#0891b2'
        },
        sky: {
            '200': '#bae6fd',
            '300': '#7dd3fc',
            '400': '#38bdf8',
            '500': '#0ea5e9',
            '600': '#0284c7'
        },
        blue: {
            '200': '#bfdbfe',
            '300': '#93c5fd',
            '400': '#60a5fa',
            '500': '#3b82f6',
            '600': '#2563eb'
        },
        indigo: {
            '200': '#c7d2fe',
            '300': '#a5b4fc',
            '400': '#818cf8',
            '500': '#6366f1',
            '600': '#4f46e5'
        },
        violet: {
            '200': '#ddd6fe',
            '300': '#c4b5fd',
            '400': '#a78bfa',
            '500': '#8b5cf6',
            '600': '#7c3aed'
        },
        purple: {
            '200': '#e9d5ff',
            '300': '#d8b4fe',
            '400': '#c084fc',
            '500': '#a855f7',
            '600': '#9333ea'
        },
        fuchsia: {
            '200': '#f5d0fe',
            '300': '#f0abfc',
            '400': '#e879f9',
            '500': '#d946ef',
            '600': '#c026d3'
        },
        pink: {
            '200': '#fbcfe8',
            '300': '#f9a8d4',
            '400': '#f472b6',
            '500': '#ec4899',
            '600': '#db2777'
        },
        rose: {
            '200': '#fecdd3',
            '300': '#fda4af',
            '400': '#fb7185',
            '500': '#f43f5e',
            '600': '#e11d48'
        }
    };

    const colorNames = Object.keys(colors);
    const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
    const randomShade = ['200', '300', '400', '500', '600'][Math.floor(Math.random() * 5)];

    return colors[randomColor][randomShade];
}

// Example usage:
