<template>
<article class="pops-card pops-card--pattern" id="{{pattern.name}}">
    <a :href=`/patterns/${pattern.name}` class="pops-card__link"><h1 class="pops-card__title">{{ pattern.name
            }}</h1></a>

    <iframe class="pops-card__iframe" :src=`/patterns/${pattern.name}` onload="resizeIframe(this)" frameborder="0"></iframe>

    <tab-set :active="0">
        <tab header="Overview">
            <div class="pops-card__overview" v-html="pattern.doc | markdown"></div>
        </tab>
        <tab header="Template">
            <pre><code>{{pattern.template}}</code></pre>
        </tab>
        <tab header="StyleSheet">
            <pre><code>{{pattern.style}}</code></pre>
        </tab>
        <tab header="Script">
            <pre><code>{{pattern.script}}</code></pre>
        </tab>
    </tab-set>
</article>
</template>

<script>
import Tab from '../Tab.vue'
import TabSet from '../TabSet.vue'

export default {
    components: {
        Tab,
        TabSet
    },
    props: ['pattern'],
    methods: {
        findPattern(patterns) {
            return patterns.find((x) => x.name === this.pattern.name)
        },
        updatePattern(data) {
            this.pattern = this.findPattern(data.patterns)
        }
    },
    created() {
        socket.on('change', this.updatePattern)
    }
}
</script>
