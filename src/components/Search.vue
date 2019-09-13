<template>
    <div>
        <sui-input
        placeholder="Digite o gif que procura..."
        icon="search"/>
    </div>
</template>

<script>
export default {
    name: 'Search',
    props: {
        search: String
    }
}
</script>