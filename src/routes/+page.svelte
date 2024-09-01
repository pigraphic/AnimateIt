<script lang="ts">
    import { animateIt } from "../components/actions/AnimateIt";
    import type { ConfigType } from '../components/actions/AnimateIt';

    const txt:string[] = [ 'Apply error and disabled', 'Reset' ];
    const animateBtn:ConfigType = {
        hover:{animation:'highlight',duration:550},
        click:{animation:'fade',duration:850}
    };
    const animatePulse:ConfigType = {
        click:{animation:'pulse',duration:800, easing: 'ease-in-out'},
    };

    let submitBtn:HTMLButtonElement;
    let field01:HTMLInputElement;
    let field02:HTMLInputElement;
    let field03:HTMLInputElement;
    let title = $state(txt[0]);

    const setError = (e:Event) => {
    e.preventDefault();
    if ( field01.classList.contains("error") ) {
        field01.classList.remove("error");
        field03.removeAttribute('disabled');
        title = txt[0];
    } else {
        field01.classList.add("error");
        field03.setAttribute('disabled', 'true');
        title = txt[1];
    }
    };
</script>
<div class="container">
    <div class="header">
    <h1>Welcome to AnimateIt!</h1>
        <h2>HTML elements animated states</h2>
    </div>
    <div class="form">
        <form action="#" method="post">
            <label for="field01">Field 01</label>
            <input use:animateIt bind:this={field01} type="text" id="field01" name="field01" />
            <label for="field02">Field 02</label>
            <input use:animateIt bind:this={field02} type="text" id="field02" name="field02" />
            <label for="field04">Field 04</label>
            <div style="width:100%">
                <input
                    use:animateIt={animatePulse}
                    type="checkbox"
                    id="field04"
                    name="field04"
                />
            </div>
            <label for="field03">Field 03</label>
            <input use:animateIt bind:this={field03} type="text" id="field03" name="field03" />
            <button
                bind:this={submitBtn}
                onclick={(e:Event) => {setError(e)}}
                use:animateIt={ animateBtn }
                type="submit"
            >
                {title}
            </button>
        </form>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        height: 100vh;
    }
    .header {
        margin-bottom: 20px;
        width: 100%;
        text-align: center;
    }
</style>
