<template>
    <div>
        <img class="simbolo" alt="Simbolo Aliança Rebelde" src="../assets/rebel-alliance.png">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    name: 'WelcomeText',
    props: {
        msg: String
    }
}
</script>