import React from 'react';
import './Card.scss';

const Card = (props) => {

    function canSelectCard() {
        if (props.obj.stayFlipped) return undefined;
        props.selectCard(props.obj);
    }

    const isSelected = () => {
        if (props.obj.stayFlipped) return props.obj.stayFlipped;
        return props.cards.filter(card => card.id === props.obj.id).length > 0 ? true : false;
    }

    return (
        <div className="card" onClick={props.onClick ? canSelectCard : undefined}>
            <div className={`card-flip ${isSelected() || props.obj.stayFlipped ? "is-flipped" : ""}`}>
                <div className="card__face card__face--front">
                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/wrarcana/wallpaper1_large.jpg" alt="Avatar" />
                </div>
                <div className="card__face card__face--back">
                    <img src={props.obj.image} alt="Avatar" />
                </div>
            </div>
        </div>
    );
}

export default Card;