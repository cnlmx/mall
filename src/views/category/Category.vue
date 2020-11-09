<template>
  <div class="wrapper">
    <ul>
      <button @click="btnClick">test</button>
      <li>项目1</li>
      <li>项目2</li>
      <li>项目3</li>
      <li>项目4</li>
      <li>项目5</li>
      <li>项目6</li>
      <li>项目7</li>
      <li>项目8</li>
      <li>项目9</li>
      <li>项目10</li>
      <li>项目11</li>
      <li>项目12</li>
      <li>项目13</li>
      <li>项目14</li>
      <li>项目15</li>
      <li>项目16</li>
      <li>项目17</li>
      <li>项目18</li>
      <li>项目19</li>
      <li>项目20</li>
      <li>项目21</li>
      <li>项目22</li>
      <li>项目23</li>
      <li>项目24</li>
      <li>项目25</li>
      <li>项目26</li>
      <li>项目27</li>
      <li>项目28</li>
      <li>项目29</li>
      <li>项目30</li>
      <li>项目31</li>
      <li>项目32</li>
      <li>项目33</li>
      <li>项目34</li>
      <li>项目35</li>
      <li>项目36</li>
      <li>项目37</li>
      <li>项目38</li>
      <li>项目39</li>
      <li>项目40</li>
      <li>项目41</li>
      <li>项目42</li>
      <li>项目43</li>
      <li>项目44</li>
      <li>项目45</li>
      <li>项目46</li>
      <li>项目47</li>
      <li>项目48</li>
      <li>项目49</li>
      <li>项目50</li>
      <li>项目51</li>
      <li>项目52</li>
      <li>项目53</li>
      <li>项目54</li>
      <li>项目55</li>
      <li>项目56</li>
      <li>项目57</li>
      <li>项目58</li>
      <li>项目59</li>
      <li>项目60</li>
      <li>项目61</li>
      <li>项目62</li>
      <li>项目63</li>
      <li>项目64</li>
      <li>项目65</li>
      <li>项目66</li>
      <li>项目67</li>
      <li>项目68</li>
      <li>项目69</li>
      <li>项目70</li>
      <li>项目71</li>
      <li>项目72</li>
      <li>项目73</li>
      <li>项目74</li>
      <li>项目75</li>
      <li>项目76</li>
      <li>项目77</li>
      <li>项目78</li>
      <li>项目79</li>
      <li>项目80</li>
      <li>项目81</li>
      <li>项目82</li>
      <li>项目83</li>
      <li>项目84</li>
      <li>项目85</li>
      <li>项目86</li>
      <li>项目87</li>
      <li>项目88</li>
      <li>项目89</li>
      <li>项目90</li>
      <li>项目91</li>
      <li>项目92</li>
      <li>项目93</li>
      <li>项目94</li>
      <li>项目95</li>
      <li>项目96</li>
      <li>项目97</li>
      <li>项目98</li>
      <li>项目99</li>
      <li>项目100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.scroll = new BScroll('.wrapper', {
      probeType: 3,
      pullUpLoad: true
    })
    this.scroll.on('scroll', position => {
      console.log(position)
    })
    this.scroll.on('pullingUp', () => {
      this.scroll.finishPullUp()
      console.log('上拉加载更多')
    })
  },
  methods: {
    btnClick () {
      console.log('test')
    }
  }
}
</script>

<style scoped>
  .wrapper {
    height: 200px;
    background-color: cadetblue;
    /* overflow: auto; */
  }

</style>
