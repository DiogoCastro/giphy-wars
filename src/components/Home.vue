<template>
  <div>
    <WelcomeText msg="Saudações!! Utilize a barra de busca para ver os GIFs relacionados ao que escrever." />

    <sui-input
    v-model="search"
    @keyup.enter="getSearchedGifs"
    placeholder="Digite o GIF que procura..."
    icon="search"/>

    <sui-button
    secondary
    @click="getSearchedGifs" >
        Pesquisar
    </sui-button>

      <h3 class="msgGifEmpty" v-if="gifArray.length === 0 "> Busque por qualquer GIF que imaginar! </h3>
      <sui-grid divided="vertically">
        <sui-grid-row :columns="5">
          <sui-grid-column
          class="col"
          centered
          :mobile="12"
          :tablet="6"
          :computer="3"
          v-for="gif in gifArray"
          :key='gif.id'>
            <sui-image
            :src="gif.images.downsized_large.url"
            @click.native="toggle(gif)"
            class="gif-style"
            size="medium"
            bordered/>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>

      <sui-modal v-model="open">
      <sui-modal-header> {{ selectedGif.title }} </sui-modal-header>
      <sui-modal-content image>
        <sui-image :src="selectedGifURL" wrapped size="medium" />
        <sui-modal-description>
          <sui-header>Nome do usuário que publicou: <span v-if="selectedGif.username !== ''"> {{ selectedGif.username }} </span> <span v-else> Indefinido </span> </sui-header>
          <p>{{ selectedGif.import_datetime }}</p>
          <p>Caso queira, você também pode ver pelo <a :href="selectedGif.bitly_gif_url" target="_blank" rel="noopener">link direto</a></p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

  </div>
</template>

<script>
import axios from '../services/axios'

import Search from './Search'
import WelcomeText from './WelcomeText'

export default {
  name: 'Home',
  data: () => ({
      search: '',
      offset: 0,
      gifArray: [],
      selectedGif: [],
      selectedGifURL: '',
      open: false
  }),
  components: {
    Search,
    WelcomeText
  },

  methods: {
    getSearchedGifs() {
      axios.get('/search', {
        params: {
          api_key: 'y5qE56u9eLlMdWSPgRHD5SNIxnFx2ALX',
          q: this.search,
          limit: 10,
          offset: this.offset
        }
      }).then(res => {
        console.log(res);
        res.data.data.forEach(item => {
          this.gifArray.push(item);
        })
        console.log(this.gifArray);
      }).catch(err => {
        console.log(err);
      })
      this.gifArray = [];
    },

    toggle(response) {
      this.open = !this.open;
      this.selectedGif = response;
      this.selectedGifURL = response.images.downsized_large.url
      console.log(this.selectedGif);
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}

.gif-style {
  cursor: pointer;
  min-height: 300px;
}

.msgGifEmpty {
  font-size: 2em;
}
</style>
