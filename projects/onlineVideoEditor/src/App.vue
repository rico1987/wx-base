<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style>
body{
    margin: 0;
    padding: 0;
}
#app {
    font-family: Verdana,Helvetica,Tahoma,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1f1f1f;
    color: white;
}
</style>
