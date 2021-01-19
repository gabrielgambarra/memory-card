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
                    <img src="https://i.pinimg.com/originals/00/93/9d/00939dff0059e823658afe98bb6d87a4.jpg" alt="Avatar" />
                </div>
                <div className="card__face card__face--back">
                    <img src={props.obj.image} alt="Avatar" />
                </div>
            </div>
        </div>
    );
}

export default Card;