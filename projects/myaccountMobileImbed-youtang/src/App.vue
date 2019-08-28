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
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-family: Verdana,Helvetica,Tahoma,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333333;
}
</style>
