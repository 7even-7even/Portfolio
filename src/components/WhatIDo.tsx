import { config } from "../config";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const handleActivation = (container: HTMLDivElement) => {
    const shouldActivate = !container.classList.contains("what-content-active");
    const siblings = Array.from(
      container.parentElement?.querySelectorAll<HTMLElement>(".what-content") ?? [],
    );

    siblings.forEach((sibling) => {
      sibling.classList.remove("what-content-active", "what-sibling");
      if (shouldActivate && sibling !== container) {
        sibling.classList.add("what-sibling");
      }
    });

    if (shouldActivate) container.classList.add("what-content-active");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleActivation(event.currentTarget);
  };

  const cards = [config.skills.develop, config.skills.design];

  return (
    <section className="whatIDO" aria-labelledby="what-i-do-title">
      <div className="what-box">
        <h2 className="title" id="what-i-do-title" data-no-split>
          W<span className="hat-h2">HAT</span>
          <span className="what-title-line">
            &nbsp;I<span className="do-h2"> DO</span>
          </span>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2" aria-hidden="true">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {cards.map((card, index) => (
            <div
              className="what-content what-noTouch"
              key={card.title}
              role="button"
              tabIndex={0}
              aria-label={`Show details for ${card.title}`}
              onClick={(event) => handleActivation(event.currentTarget)}
              onKeyDown={handleKeyDown}
            >
              <div className="what-border1" aria-hidden="true">
                <svg height="100%">
                  {index === 0 && (
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  )}
                  <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                </svg>
              </div>
              <div className="what-corner" aria-hidden="true" />
              <div className="what-content-in">
                <h3>{card.title}</h3>
                <h4>{card.description}</h4>
                <p>{card.details}</p>
                <h5>Skillset &amp; tools</h5>
                <div className="what-content-flex">
                  {card.tools.map((tool) => (
                    <span key={tool} className="what-tags">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="what-arrow" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
