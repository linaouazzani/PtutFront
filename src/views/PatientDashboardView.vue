<template>
  <div class="dashboard-page">
    <header class="dashboard-header container">
      <div class="logo-container" @click="goHome" style="cursor: pointer;">
        <img src="/Frame 11.png" alt="Logo" class="nav-logo-img" />
        <span class="logo-text">Play <span class="text-cyan">'N</span> Ride</span>
      </div>
      <div class="user-profile">
        <span class="user-name">Bonjour, <strong>Jean</strong> 👋</span>
        <div class="user-avatar-mini">J</div>
        <button class="logout-btn" @click="logout">Déconnexion</button>
      </div>
    </header>

    <main class="container dashboard-main">
      <div class="alert-banner warning-banner" v-if="showWarning">
        <div class="alert-icon">!</div>
        <div class="alert-content">
          <h4>Rappel Important !</h4>
          <p>Cela fait 3 jours que vous n'avez pas fait d'exercice. Prenez quelques minutes aujourd'hui pour bouger !</p>
        </div>
        <button class="close-alert" @click="showWarning = false">&times;</button>
      </div>

      <div class="alert-banner success-banner">
        <div class="alert-icon">🎉</div>
        <div class="alert-content">
          <h4>Prêt(e) pour votre séance ?</h4>
          <p>Vous êtes sur la bonne voie. Choisissez votre aventure ci-dessous !</p>
        </div>
      </div>

      <div class="section-title">
        <h2>Choisissez votre <span class="text-cyan">aventure</span></h2>
        <p>Sélectionnez un parcours pour commencer à pédaler</p>
      </div>

      <div class="activities-grid">
        <div 
          v-for="(activity, index) in activities" 
          :key="index" 
          class="activity-card"
          :style="{ borderTopColor: activity.color }"
        >
          <div class="activity-icon">{{ activity.icon }}</div>
          <h3>{{ activity.title }}</h3>
          <p class="activity-desc">{{ activity.desc }}</p>
          
          <div class="activity-tags">
            <span class="tag"><i class="icon-time">⏱️</i> {{ activity.duration }}</span>
            <span class="tag" :style="{ backgroundColor: activity.color + '20', color: activity.color }">
              {{ activity.theme }}
            </span>
          </div>
          
          <button 
            class="btn-play-activity" 
            :style="{ backgroundColor: activity.color }"
            @click="openAvatarStudio(activity)"
          >
            ▷ Choisir cette activité
          </button>
        </div>
      </div>
    </main>

    <div class="modal-overlay" :class="{ active: showAvatarStudio }">
      <div class="avatar-modal">
        <div class="avatar-header">
          <h3>Studio Avatar</h3>
          <p>Personnalisez votre personnage pour <strong>{{ selectedActivity?.title }}</strong></p>
          <button class="close-modal" @click="showAvatarStudio = false">&times;</button>
        </div>

        <div class="avatar-body">
          <div class="avatar-preview-section">
            <div class="avatar-circle">
              <div class="avatar-emoji">{{ currentAvatarFace }}</div>
              <div class="avatar-shirt" :style="{ backgroundColor: shirtColors[avatarSelections.shirt] }"></div>
            </div>
            <div class="avatar-summary">
              <p>Coiffure : <strong>{{ avatarSelections.hair }}</strong></p>
              <p>Lunettes : <strong>{{ avatarSelections.glasses }}</strong></p>
              <p>Maillot : <strong>{{ avatarSelections.shirt }}</strong></p>
            </div>
          </div>

          <div class="avatar-options-section">
            <div class="options-tabs">
              <button 
                :class="{ active: activeTab === 'hair' }" 
                @click="activeTab = 'hair'"
              >Coiffure</button>
              <button 
                :class="{ active: activeTab === 'glasses' }" 
                @click="activeTab = 'glasses'"
              >Lunettes</button>
              <button 
                :class="{ active: activeTab === 'shirt' }" 
                @click="activeTab = 'shirt'"
              >Maillot</button>
            </div>

            <div class="options-grid">
              <template v-if="activeTab === 'hair'">
                <button 
                  v-for="option in hairOptions" :key="option.id"
                  class="option-btn" 
                  :class="{ selected: avatarSelections.hair === option.id }"
                  @click="avatarSelections.hair = option.id"
                >
                  {{ option.label }}
                </button>
              </template>

              <template v-if="activeTab === 'glasses'">
                <button 
                  v-for="option in glassesOptions" :key="option.id"
                  class="option-btn" 
                  :class="{ selected: avatarSelections.glasses === option.id }"
                  @click="avatarSelections.glasses = option.id"
                >
                  {{ option.label }}
                </button>
              </template>

              <template v-if="activeTab === 'shirt'">
                <button 
                  v-for="option in shirtOptions" :key="option.id"
                  class="option-btn color-option" 
                  :class="{ selected: avatarSelections.shirt === option.id }"
                  @click="avatarSelections.shirt = option.id"
                >
                  <span class="color-dot" :style="{ backgroundColor: shirtColors[option.id] }"></span>
                  {{ option.label }}
                </button>
              </template>
            </div>
          </div>
        </div>

        <div class="avatar-footer">
          <button class="btn-start-game" @click="startGame">
            ▷ VALIDER ET JOUER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarning = ref(true)

// --- DONNÉES DES ACTIVITÉS (BIBLIOTHÈQUE) ---
const activities = [
  { title: "Balade Matinale", desc: "Une promenade douce à travers la campagne au lever du soleil.", duration: "15 min", theme: "Nature", icon: "🌅", color: "#FFB800" },
  { title: "Sentier Forestier", desc: "Explorez la forêt verdoyante avec ses arbres majestueux.", duration: "20 min", theme: "Forêt", icon: "🌲", color: "#00BA55" },
  { title: "Brise Marine", desc: "Pédalez le long de la côte avec la brise océanique.", duration: "10 min", theme: "Plage", icon: "🌊", color: "#00B8D9" },
  { title: "Jardin Fleuri", desc: "Une balade relaxante à travers un jardin coloré.", duration: "12 min", theme: "Jardin", icon: "🌸", color: "#FF3366" },
  { title: "Chemin Montagnard", desc: "Défiez-vous avec un parcours de montagne stimulant.", duration: "25 min", theme: "Montagne", icon: "⛰️", color: "#8B572A" },
  { title: "Nuages Célestes", desc: "Une aventure fantastique dans les cieux.", duration: "20 min", theme: "Ciel", icon: "☁️", color: "#7B61FF" }
]

// --- LOGIQUE DU STUDIO AVATAR ---
const showAvatarStudio = ref(false)
const selectedActivity = ref(null)
const activeTab = ref('hair')

// Choix par défaut de l'utilisateur
const avatarSelections = ref({
  hair: 'Court',
  glasses: 'Aucune',
  shirt: 'Bleu'
})

// Options disponibles
const hairOptions = [
  { id: 'Court', label: 'Court', emoji: '👦' },
  { id: 'Mi-long', label: 'Mi-long', emoji: '🧑' },
  { id: 'Long', label: 'Long', emoji: '👩' },
  { id: 'Chauve', label: 'Chauve', emoji: '🧑‍🦲' }
]
const glassesOptions = [
  { id: 'Aucune', label: 'Aucune', emoji: '' },
  { id: 'Lunettes', label: 'Lunettes', emoji: '👓' }
]
const shirtOptions = [
  { id: 'Bleu', label: 'Bleu' },
  { id: 'Rouge', label: 'Rouge' },
  { id: 'Vert', label: 'Vert' },
  { id: 'Orange', label: 'Orange' }
]

// Dictionnaire de couleurs pour le t-shirt
const shirtColors = {
  'Bleu': '#007BFF',
  'Rouge': '#FF4757',
  'Vert': '#2ED573',
  'Orange': '#FFA502'
}

// Calcule l'émoji du visage en fonction des choix en temps réel
const currentAvatarFace = computed(() => {
  const hairEmoji = hairOptions.find(h => h.id === avatarSelections.value.hair)?.emoji || '🧑'
  const glasses = avatarSelections.value.glasses === 'Lunettes' ? '👓' : ''
  return hairEmoji + glasses 
})

// Actions
const goHome = () => router.push('/')
const logout = () => router.push('/auth')

const openAvatarStudio = (activity) => {
  selectedActivity.value = activity
  showAvatarStudio.value = true
  document.body.style.overflow = 'hidden'
}

const startGame = () => {
  showAvatarStudio.value = false
  document.body.style.overflow = 'auto'
  alert(`Lancement du jeu "${selectedActivity.value.title}" avec l'avatar personnalisé !`)
  // Plus tard : router.push('/jeu-en-cours')
}
</script>

<style scoped>
/* ================= DASHBOARD GLOBAL ================= */
.dashboard-page {
  background-color: #F8FAFC;
  min-height: 100vh;
  padding-bottom: 50px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}
.logo-container { display: flex; align-items: center; gap: 10px; }
.nav-logo-img { height: 40px; }
.logo-text { font-size: 1.5rem; font-weight: 900; color: #0A192F; }
.text-cyan { color: #00B8D9; }

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}
.user-name { color: #0A192F; font-size: 1.1rem; }
.user-avatar-mini {
  width: 40px; height: 40px; border-radius: 50%;
  background-color: #20C997; color: white;
  display: flex; justify-content: center; align-items: center;
  font-weight: bold; font-size: 1.2rem;
}
.logout-btn {
  background: none; border: none; color: #6B7C93;
  cursor: pointer; text-decoration: underline; font-size: 0.9rem;
}

/* ================= BANNIÈRES D'ALERTE ================= */
.alert-banner {
  display: flex; align-items: center; gap: 15px;
  padding: 15px 20px; border-radius: 12px; margin-bottom: 20px;
  position: relative;
}
.warning-banner { background-color: #FFF3CD; color: #856404; border-left: 5px solid #FFC107; }
.success-banner { background-color: #D4EDDA; color: #155724; border-left: 5px solid #28A745; background: linear-gradient(90deg, #20C997 0%, #00B8D9 100%); color: white;}

.alert-icon { font-size: 1.5rem; font-weight: bold; }
.alert-content h4 { margin-bottom: 5px; font-size: 1.1rem;}
.alert-content p { font-size: 0.95rem; margin: 0; }
.close-alert { position: absolute; right: 15px; top: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: inherit; opacity: 0.7;}

/* ================= SECTION TITRE ================= */
.section-title { text-align: center; margin: 40px 0 30px; }
.section-title h2 { font-size: 2rem; color: #0A192F; }
.section-title p { color: #6B7C93; font-size: 1.1rem; }

/* ================= GRILLE ACTIVITÉS ================= */
.activities-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.activity-card {
  background: white; border-radius: 16px; padding: 30px 25px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.03);
  border-top: 6px solid #ccc;
  text-align: center; display: flex; flex-direction: column;
  transition: transform 0.2s;
}
.activity-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.08);}

.activity-icon { font-size: 3.5rem; margin-bottom: 15px; }
.activity-card h3 { color: #0A192F; font-size: 1.3rem; margin-bottom: 10px; }
.activity-desc { color: #6B7C93; font-size: 0.95rem; line-height: 1.5; margin-bottom: 20px; flex: 1;}

.activity-tags { display: flex; justify-content: center; gap: 10px; margin-bottom: 25px; }
.tag { padding: 5px 12px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; background: #F1F5F9; color: #6B7C93; display: flex; align-items: center; gap: 5px;}

.btn-play-activity {
  width: 100%; padding: 12px; border: none; border-radius: 8px;
  color: white; font-weight: 800; font-size: 1rem; cursor: pointer;
  transition: opacity 0.2s;
}
.btn-play-activity:hover { opacity: 0.9; }

/* ================= MODALE STUDIO AVATAR ================= */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(10,25,47,0.8); z-index: 1000;
  display: flex; justify-content: center; align-items: center;
  opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px;
}
.modal-overlay.active { opacity: 1; visibility: visible; }

.avatar-modal {
  background: white; width: 100%; max-width: 650px;
  border-radius: 20px; overflow: hidden;
  transform: translateY(30px); transition: 0.3s;
}
.modal-overlay.active .avatar-modal { transform: translateY(0); }

.avatar-header {
  background: #EAF7F9; padding: 20px; text-align: center; position: relative;
}
.avatar-header h3 { color: #0A192F; font-size: 1.5rem; margin-bottom: 5px; }
.avatar-header p { color: #6B7C93; font-size: 0.95rem; }
.close-modal {
  position: absolute; right: 20px; top: 20px; font-size: 2rem;
  background: none; border: none; color: #6B7C93; cursor: pointer;
}

.avatar-body {
  display: flex; padding: 30px; gap: 30px; border-bottom: 1px solid #eee;
}

/* PRÉVISUALISATION (Gauche) */
.avatar-preview-section { flex: 1; display: flex; flex-direction: column; align-items: center; border-right: 1px solid #eee; padding-right: 20px;}
.avatar-circle {
  width: 150px; height: 150px; border-radius: 50%;
  background-color: #2ED573; position: relative; overflow: hidden;
  display: flex; justify-content: center; align-items: center;
  margin-bottom: 20px; box-shadow: 0 10px 20px rgba(46, 213, 115, 0.3);
}
.avatar-emoji { font-size: 6rem; z-index: 2; margin-top: -20px;}
.avatar-shirt {
  position: absolute; bottom: 0; width: 100px; height: 50px;
  border-radius: 50px 50px 0 0; z-index: 1; transition: background-color 0.3s;
}
.avatar-summary p { font-size: 0.9rem; color: #6B7C93; margin-bottom: 5px; text-align: center;}
.avatar-summary strong { color: #0A192F; }

/* OPTIONS (Droite) */
.avatar-options-section { flex: 1.5; }
.options-tabs { display: flex; gap: 10px; margin-bottom: 20px; }
.options-tabs button {
  flex: 1; padding: 8px; border: none; border-radius: 50px; background: #F1F5F9;
  color: #6B7C93; font-weight: 700; cursor: pointer; font-size: 0.85rem;
}
.options-tabs button.active { background: #00B8D9; color: white; }

.options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.option-btn {
  padding: 12px; background: white; border: 2px solid #E2E8F0;
  border-radius: 12px; font-weight: 700; color: #0A192F; cursor: pointer;
  transition: all 0.2s; display: flex; justify-content: center; align-items: center; gap: 10px;
}
.option-btn:hover { border-color: #00B8D9; }
.option-btn.selected { border-color: #00B8D9; background: #EAF7F9; color: #00B8D9; }

.color-dot { width: 15px; height: 15px; border-radius: 50%; display: inline-block; }

/* BOUTON JOUER (Bas) */
.avatar-footer { padding: 20px; background: white; }
.btn-start-game {
  width: 100%; padding: 16px; border: none; border-radius: 50px;
  background-color: #00B8D9; color: white; font-size: 1.2rem;
  font-weight: 800; cursor: pointer; transition: 0.2s;
  box-shadow: 0 10px 20px rgba(0, 184, 217, 0.3);
}
.btn-start-game:hover { transform: translateY(-2px); background-color: #0099b3; }

@media (max-width: 768px) {
  .avatar-body { flex-direction: column; }
  .avatar-preview-section { border-right: none; border-bottom: 1px solid #eee; padding-right: 0; padding-bottom: 20px;}
}
</style>