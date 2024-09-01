/**
 * AnimateIt
 *
 * A utility function to animate elements based on their state.
 *
 * @author Giulio Porta P.I.Graphic
 * @version 1.0.0
 * @license MIT
 *
 * @param {HTMLElement} node - The element to animate
 * @param {Object} config - The configuration object
 * */

type EasingType = 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

export type ConfigType = {
    error?: { animation: string; duration: number; easing?: EasingType; };
    click?: { animation: string; duration: number; easing?: EasingType; };
    focus?: { animation: string; duration: number; easing?: EasingType; };
    hover?: { animation: string; duration: number; easing?: EasingType; };
    blur?: { animation: string; duration: number; easing?: EasingType; };
    disabled?: { animation: string; duration: number; easing?: EasingType; };
};

type ConfigTypeKey = keyof ConfigType;

export function animateIt ( node: HTMLElement, config?: ConfigType ) {
    const defaultConfig: ConfigType = {
        error: { animation: "tremor", duration: 300 },
        click: { animation: "scale", duration: 200 },
        focus: { animation: "highlight", duration: 300 },
        hover: { animation: "scale", duration: 200 },
        blur: { animation: "fade", duration: 200 },
        disabled: { animation: "grayscale", duration: 300 },
    };

    const defaultEase = 'ease-out';
    const mergedConfig: ConfigType = { ...defaultConfig, ...config };

    //let currentState: ConfigTypeKey | null = null;

    function applyAnimation ( state: ConfigTypeKey ) {
        if ( !mergedConfig[ state ] ) return;
        const { animation, duration, easing } = mergedConfig[ state ];
        /*
        if ( duration > 300 && currentState === state ) return;
        currentState = state;
        */

        switch ( animation ) {
            case "shake":
                node.animate( { transform: [ "translateX(0px)", "translateX(-7px)", "translateX(7px)", "translateX(0px)" ] }, {
                    duration,
                    iterations: 3,
                    easing: easing || defaultEase
                } );
                break;
            case "pulse":
                node.animate( { transform: [ "scale(1)", "scale(1.05)", "scale(1)" ] }, {
                    duration,
                    easing: easing || defaultEase,
                    iterations: 4
                } );
                break;
            case "highlight":
                node.animate( { boxShadow: [ "0 0 0 0 rgba(66, 153, 225, 0)", "0 0 0 4px rgba(242, 255, 255, 0.562)", "0 0 0 0 rgba(66, 153, 225, 0)" ] }, {
                    duration,
                    easing: easing || defaultEase
                } );
                break;
            case "scale":
                node.animate( { transform: [ "scale(1)", "scale(1.03)" ] }, {
                    duration,
                    easing: easing || defaultEase
                } );
                break;
            case "fade":
                node.animate( { opacity: [ 1, 0.5, 1 ] }, {
                    duration,
                    easing: easing || defaultEase
                } );
                break;
            case "grayscale":
                node.animate( { filter: [ "grayscale(0%)", "grayscale(100%)" ] }, {
                    duration,
                    easing: easing || defaultEase
                } );
                break;
            case "tremor":
                node.animate( [ { transform: 'scale(1)' }, { transform: 'scale(1.01)' } ], {
                    duration: 100,
                    direction: 'alternate',
                    easing: easing || defaultEase,
                    iterations: 7
                } );
        }
    }

    function handleStateChanges () {
        if ( node.classList.contains( 'error' ) ) {
            applyAnimation( 'error' );
        } else if ( node.hasAttribute( 'disabled' ) ) {
            applyAnimation( 'disabled' );
        }
    }

    const clickHandler = () => applyAnimation( 'click' );
    const focusHandler = () => applyAnimation( 'focus' );
    const hoverHandler = () => applyAnimation( 'hover' );
    const blurHandler = () => applyAnimation( 'blur' );

    node.addEventListener( 'click', clickHandler );
    node.addEventListener( 'focus', focusHandler );
    node.addEventListener( 'mouseenter', hoverHandler );
    node.addEventListener( 'blur', blurHandler );

    // Initial check
    handleStateChanges();

    // Set up MutationObserver to watch for class changes
    const observer = new MutationObserver( handleStateChanges );
    observer.observe( node, { attributes: true, attributeFilter: [ 'class', 'disabled' ] } );

    return {
        destroy () {
            node.removeEventListener( 'click', clickHandler );
            node.removeEventListener( 'focus', focusHandler );
            node.removeEventListener( 'mouseenter', hoverHandler );
            node.removeEventListener( 'blur', blurHandler );
            observer.disconnect();
        },
        update ( newConfig: ConfigType ) {
            Object.assign( mergedConfig, newConfig );
        }
    };
}
