import React from 'react'
import { GiPizzaCutter } from "react-icons/gi";
import { FaInstagram, FaVk, FaTelegramPlane } from "react-icons/fa";
import PropTypes from 'prop-types';

const Footer = ({ events, handleCategoryChange }) => {
  const renderEventsList = () => {
    const eventsArray = Array.isArray(events) 
      ? events 
      : events && typeof events === 'object'
          ? Object.values(events)
          : [];

    const activeEvents = eventsArray.filter(event => event?.active);

    if (!activeEvents.length) {
      return (
        <ul className="footer__nav__list">
          <li className="footer__nav__item footer__nav-head">
            <a href="#events" className="footer__nav__link">События</a>
          </li>
          <li className="footer__nav__item">
            <span className="footer__nav__link">Нет активных событий</span>
          </li>
        </ul>
      );
    }

    return (
      <ul className="footer__nav__list">
        <li className="footer__nav__item footer__nav-head">
          <a href="#events" className="footer__nav__link">События</a>
        </li>
        {activeEvents.map(event => (
          <li key={event.id || Math.random()} className="footer__nav__item">
            <a href={`#event${event.id}`} className="footer__nav__link">
              {event.title}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return(
    <div className="footer">
      <div className="footer__container">
        <div className="footer__nav">
          <div className="footer__nav__col">
            <a href="# " className="footer__nav__item">
              <span className="logo footer__logo">
                <GiPizzaCutter className="logo-icon"/> 
                <span>Pizza</span><span>LAB</span>
              </span>
            </a>
          </div>
          <ul className="footer__nav__list">
            <li className="footer__nav__item footer__nav-head"><a href="#home" className="footer__nav__link">Главная</a></li>
            <li className="footer__nav__item"><a href="#menu" className="footer__nav__link">Меню</a></li>
            <li className="footer__nav__item"><a href="#bestsellers" className="footer__nav__link">Бестселлеры</a></li>
            <li className="footer__nav__item"><a href="#events" className="footer__nav__link">События</a></li>
            <li className="footer__nav__item"><a href="#about" className="footer__nav__link">О нас</a></li>
          </ul>
          <ul className="footer__nav__list">
            <li className="footer__nav__item footer__nav-head"><a href="#menu" className="footer__nav__link">Меню</a></li>
            <li className="footer__nav__item" onClick={() => handleCategoryChange?.(null)}><a href="#menu" className="footer__nav__link">Показать все</a></li>
            <li className="footer__nav__item" onClick={() => handleCategoryChange?.("мясная")}><a href="#menu" className="footer__nav__link">Мясные</a></li>
            <li className="footer__nav__item" onClick={() => handleCategoryChange?.("вегатерианская")}><a href="#menu" className="footer__nav__link">Вегатерианские</a></li>
            <li className="footer__nav__item" onClick={() => handleCategoryChange?.("с морепродуктами")}><a href="#menu" className="footer__nav__link">С морепродуктами</a></li>
            <li className="footer__nav__item" onClick={() => handleCategoryChange?.("грибная")}><a href="#menu" className="footer__nav__link">Грибные</a></li>
          </ul>
          {renderEventsList()}
          <ul className="footer__nav__list">
            <li className="footer__nav__item footer__nav-head"><a href="#about" className="footer__nav__link">О нас</a></li>
            <li className="footer__nav__item"><a href="#ourHistory" className="footer__nav__link">Наша история</a></li>
            <li className="footer__nav__item"><a href="#whyWe" className="footer__nav__link">Почему мы?</a></li>
          </ul>
        </div>
    
        <div className="footer__contacts">
          <a href="tel:+7-888-88-88" className="footer__contacts__tel">+7 (888) 888-88-88</a>
          <div className="footer__contacts__socials">
            <a href="https://instagram.com" className="footer__contacts__socials__link">
              <FaInstagram className="social-icon"/>
            </a>
            <a href="https://vk.com" className="footer__contacts__socials__link">
              <FaVk className="social-icon" />
            </a>
            <a href="https://tg.com" className="footer__contacts__socials__link">
              <FaTelegramPlane className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  events: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        active: PropTypes.bool
      })
    ),
    PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        active: PropTypes.bool
      })
    )
  ]),
  handleCategoryChange: PropTypes.func
};

export default Footer;