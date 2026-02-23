<template>
  <main>
    <section class="hero-section container">
      <div class="hero-content">
        <div class="badge badge-light-blue">🩺 Rééducation connectée pour tous</div>
        <h1>L'activité physique devient <span class="text-green">un jeu.</span></h1>
        <p class="subtitle">Transformez vos exercices quotidiens en aventures interactives. Connectez votre pédalier et évadez-vous depuis votre salon.</p>
        <div class="hero-actions">
          <button class="btn btn-solid-green btn-large icon-btn">▶ MODE LIBRE</button>
          <button class="btn btn-outline-blue btn-large">DÉCOUVRIR LES JEUX</button>
        </div>
        <div class="social-proof">
          <div class="avatars">
            <div class="avatar" style="background-color: #a8e6cf;">A</div>
            <div class="avatar" style="background-color: #dcedc1;">B</div>
            <div class="avatar" style="background-color: #ffd3b6;">C</div>
          </div>
          <p><strong>+ 2 500</strong> utilisateurs actifs</p>
        </div>
      </div>
      <div class="hero-image-container">
        <img src="/hero-image.png" alt="Senior utilisant Play 'N Ride" class="hero-img">
        <div class="floating-badge">
          <span class="icon">🎮</span>
          <div><strong>7+</strong><br><span>Jeux disponibles</span></div>
        </div>
      </div>
    </section>

    <section id="temoignages" class="testimonial-section container">
      <div class="stars">⭐⭐⭐⭐⭐</div>
      <p class="rating-text"><strong>4.9/5</strong> par <span class="text-green"><strong>1 500 utilisateurs</strong></span></p>
      
      <div class="carousel-container">
        <button class="carousel-btn prev-btn" @click="prevSlide">&#10094;</button>
        <div class="testimonial-slider">
          <div class="quote-card active">
            <div class="quote-icon">❞</div>
            <p class="quote-text">{{ testimonials[currentSlide].text }}</p>
            <p class="quote-author">{{ testimonials[currentSlide].author }}</p>
          </div>
        </div>
        <button class="carousel-btn next-btn" @click="nextSlide">&#10095;</button>
      </div>
      <div class="carousel-dots">
        <span v-for="(t, index) in testimonials" :key="index" class="dot" :class="{ active: currentSlide === index }" @click="goToSlide(index)"></span>
      </div>
    </section>

    <section id="pourquoi" class="features-section container">
      <div class="section-header">
        <div class="badge badge-light-cyan">Nos atouts</div>
        <h2>Pourquoi <span class="text-cyan">Play 'N Ride</span> ?</h2>
      </div>
      <div class="grid-3-cols">
        <div v-for="(feature, index) in features" :key="index" class="card expandable-card" @click="openModal(feature)">
          <div :class="['card-icon', feature.colorClass]">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.shortDesc }}</p>
        </div>
      </div>
    </section>

    <section id="pourqui" class="audience-section container">
      <div class="section-header">
        <div class="badge badge-light-green">Pour tous</div>
        <h2>Pour qui est fait <span class="text-cyan">Play 'N Ride</span> ?</h2>
      </div>
      <div class="grid-3-cols audience-cards">
        <div v-for="(audience, index) in audiences" :key="index" class="card audience-card expandable-card" @click="openModal(audience)">
          <div :class="['card-icon sm-icon', audience.colorClass]">{{ audience.icon }}</div>
          <p class="target-label">{{ audience.label }}</p>
          <h3>{{ audience.title }}</h3>
          <p class="desc">{{ audience.shortDesc }}</p>
          <ul class="feature-list">
            <li v-for="(item, i) in audience.list" :key="i">{{ item }}</li>
          </ul>
          <span :class="['learn-more', 'text-' + audience.colorName]">Agrandir →</span>
        </div>
      </div>
    </section>

    <div class="modal-overlay" :class="{ active: isModalOpen }" @click.self="closeModal">
      <div class="modal-content" v-if="activeCardData">
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-header">
          <div :class="['card-icon modal-icon', activeCardData.colorClass]">{{ activeCardData.icon }}</div>
          <h3>{{ activeCardData.title }}</h3>
        </div>
        <div class="modal-body">
          <p class="modal-intro">{{ activeCardData.shortDesc }}</p>
          <div class="modal-details-block" v-html="activeCardData.hiddenDetails"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)
const testimonials = [
  { text: "\"Mes patients sont bien plus motivés qu'avant. C'est un outil formidable.\"", author: "Dr. Lefevre, Kinésithérapeute" },
  { text: "\"Je ne vois plus le temps passer quand je pédale. J'ai retrouvé le plaisir de bouger !\"", author: "Marc, 68 ans" },
  { text: "\"Devenu l'activité préférée de nos résidents !\"", author: "Sophie D., Directrice d'EHPAD" }
]

const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % testimonials.length }
const prevSlide = () => { currentSlide.value = currentSlide.value === 0 ? testimonials.length - 1 : currentSlide.value - 1 }
const goToSlide = (index) => { currentSlide.value = index }

const features = [
  { icon: '✨', title: "Fini l'ennui", shortDesc: "Grâce à la gamification, chaque séance devient une aventure captivante.", hiddenDetails: "<p>Notre moteur de jeu transforme votre effort en mouvement.</p>", colorClass: 'blue-icon', colorName: 'blue' },
  { icon: '⏱️', title: "À votre rythme", shortDesc: "Nos exercices s'adaptent automatiquement à votre niveau.", hiddenDetails: "<p>L'IA analyse votre cadence en temps réel pour ajuster la difficulté.</p>", colorClass: 'green-icon', colorName: 'green' },
  { icon: '📈', title: "Suivi complet", shortDesc: "Visualisez vos progrès en temps réel et votre historique.", hiddenDetails: "<p>Retrouvez des graphiques clairs et exportez vos données.</p>", colorClass: 'cyan-icon', colorName: 'cyan' }
]

const audiences = [
  { label: "Pour les Particuliers", icon: '🏠', title: "Seniors & Adulte", shortDesc: "Restez actif à domicile avec plaisir.", list: ["Exercices adaptés", "Suivi personnel", "Interface simple"], hiddenDetails: "<p>Idéal pour le maintien de l'autonomie. Installation 'Zero-Touch'.</p>", colorClass: 'blue-icon', colorName: 'blue' },
  { label: "Pour les Pros", icon: '🩺', title: "Professionnels de santé", shortDesc: "Suivez l'activité de vos patients à distance.", list: ["Suivi à distance", "Rapports détaillés", "Multi-patients"], hiddenDetails: "<p>Prescrivez des 'doses' de jeu et suivez l'observance de vos patients.</p>", colorClass: 'green-icon', colorName: 'green' },
  { label: "EHPAD, Salles de sport", icon: '🏢', title: "Structures & Établissements", shortDesc: "Animez vos espaces forme avec une solution clé en main.", list: ["Solution clé en main", "Animations", "Support"], hiddenDetails: "<p>Organisez des challenges bienveillants entre résidents.</p>", colorClass: 'cyan-icon', colorName: 'cyan' }
]

const isModalOpen = ref(false)
const activeCardData = ref(null)

const openModal = (data) => {
  activeCardData.value = data
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => { activeCardData.value = null }, 300)
  document.body.style.overflow = 'auto'
}
</script>
