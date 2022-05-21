import ScrollMagic from 'scrollmagic';

export const initScrollMagicHome = () => {
    const signUpButtonController = new ScrollMagic.Controller();
    const signUpButton = new ScrollMagic.Scene({
            triggerElement: '#signUpButton',
            offset: -200
        })        
        .setClassToggle('#signUpButton', 'shift')
        .addTo(signUpButtonController);
    const mobileEuroController = new ScrollMagic.Controller();
    const mobileEuro = new ScrollMagic.Scene({
            triggerElement: '#signUpButton',
            offset: -200
        })        
        .setClassToggle('#mobileEuro', 'shift')
        .addTo(mobileEuroController);
    const goalsCardController = new ScrollMagic.Controller();
    const goalsCard = new ScrollMagic.Scene({
            triggerElement: '#goalsCard',
            offset: -300
        })        
        .setClassToggle('#goalsCard', 'shift')
        .addTo(goalsCardController);
    const pomodoroCardController = new ScrollMagic.Controller();
    const pomodoroCard = new ScrollMagic.Scene({
            triggerElement: '#pomodoroCard',
            offset: -300
        })        
        .setClassToggle('#pomodoroCard', 'shift')
        .addTo(pomodoroCardController);
    const markdownCardController = new ScrollMagic.Controller();
    const markdownCard = new ScrollMagic.Scene({
            triggerElement: '#markdownCard',
            offset: -300
        })        
        .setClassToggle('#markdownCard', 'shift')
        .addTo(markdownCardController);
    const drumCalcCardController = new ScrollMagic.Controller();
    const drumCalcCard = new ScrollMagic.Scene({
            triggerElement: '#drumCalcCard',
            offset: -300
        })        
        .setClassToggle('#drumCalcCard', 'shift')
        .addTo(drumCalcCardController);
    const todoCardController = new ScrollMagic.Controller();
    const todoCard = new ScrollMagic.Scene({
            triggerElement: '#todoCard',
            offset: -300
        })        
        .setClassToggle('#todoCard', 'shift')
        .addTo(todoCardController);
}

export const initScrollMagicHeader = () => {
    const heroLeftController = new ScrollMagic.Controller();
    const heroLeft = new ScrollMagic.Scene({
            triggerElement: '#heroLeft',
            offset: -300,
            duration: 500
        })        
        .setClassToggle('#heroLeft', 'show')
        .addTo(heroLeftController);
    const heroRightController = new ScrollMagic.Controller();
    const heroRight = new ScrollMagic.Scene({
            triggerElement: '#heroLeft',
            offset: -300,
            duration: 500
        })        
        .setClassToggle('#heroRight', 'show')
        .addTo(heroRightController);
    const heroTextController = new ScrollMagic.Controller();
    const heroText = new ScrollMagic.Scene({
            triggerElement: '#heroLeft',
            offset: -300,
            duration: 500
        })        
        .setClassToggle('#heroText', 'show')
        .addTo(heroTextController);
    const redRowController = new ScrollMagic.Controller();
    const redRow = new ScrollMagic.Scene({
            triggerElement: '#heroLeft',
            offset: -300,
            duration: 500
        })        
        .setClassToggle('#redRow', 'show')
        .addTo(redRowController);
}

export const initScrollMagicTransaction = () => {
    const transactionImageController = new ScrollMagic.Controller();
    const transactionImage = new ScrollMagic.Scene({
            triggerElement: '#transactionImage',
            offset: 0
        })        
        .setClassToggle('#transactionImage', 'show')
        .addTo(transactionImageController);
    const transactionTextController = new ScrollMagic.Controller();
    const transactionText = new ScrollMagic.Scene({
            triggerElement: '#transactionText',
            offset: 50
        })        
        .setClassToggle('#transactionText', 'show')
        .addTo(transactionTextController);
}
