export default function Marquee() {
    const items = [
        'Arts & Crafts',
        'Music & Dance',
        'Puzzle Play',
        'Story Time',
        'Nature Walks',
        'Physical Play',
        'Number Fun',
        'Language Skills',
        'Drama & Role Play',
        'Building Blocks',
        'Festival Celebrations',
        'Social Skills',
    ]

    return (
        <div className="marquee-section">
            <div className="marquee-track">
                <div className="marquee-content">
                    {items.map((item, i) => (
                        <span key={`first-${i}`} className="marquee-item">
                            <span className="marquee-dot">🌟</span>
                            {item}
                        </span>
                    ))}
                </div>
                <div className="marquee-content" aria-hidden="true">
                    {items.map((item, i) => (
                        <span key={`second-${i}`} className="marquee-item">
                            <span className="marquee-dot">🌟</span>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
