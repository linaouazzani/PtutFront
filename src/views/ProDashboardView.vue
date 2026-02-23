<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand" @click="$router.push('/')">
          <img src="/Frame 11.png" alt="Logo" class="sidebar-logo" />
          <div class="brand-info">
            <p class="brand-name">Play 'N Ride</p>
            <p class="brand-tag">Pro</p>
          </div>
        </div>

        <nav class="sidebar-menu">
          <a href="#" class="menu-item active">
            <span class="icon">👥</span> Patients
          </a>
          <a href="#" class="menu-item">
            <span class="icon">📖</span> Bibliothèque
          </a>
          <a href="#" class="menu-item">
            <span class="icon">📈</span> Monitoring
          </a>
          <a href="#" class="menu-item">
            <span class="icon">⚙️</span> Paramètres
          </a>
        </nav>
      </div>

      <div class="sidebar-bottom">
        <div class="pro-profile">
          <div class="pro-avatar">D</div>
          <div class="pro-info">
            <p class="pro-name">Dr. Sophie Durand</p>
            <p class="pro-mail">pro@gmail.com</p>
          </div>
        </div>
        <button class="logout-link" @click="$router.push('/auth')">
          Déconnexion ↪️
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header class="content-header">
        <h1>Patients</h1>
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" v-model="searchQuery" placeholder="Rechercher..." />
        </div>
      </header>

      <div class="table-wrapper">
        <table class="patients-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Âge</th>
              <th>Statut</th>
              <th>Dernière séance</th>
              <th>Progression</th>
              <th>Niveau</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in filteredPatients" :key="patient.nom">
              <td class="font-bold">{{ patient.nom }}</td>
              <td class="text-muted">{{ patient.age }} ans</td>
              <td>
                <span :class="['status-pill', patient.statut === 'Actif' ? 'active' : 'inactive']">
                  {{ patient.statut }}
                </span>
              </td>
              <td class="text-muted">{{ patient.derniereSeance }}</td>
              <td>
                <div class="progress-container">
                  <div class="progress-bar" :style="{ width: patient.progression + '%' }"></div>
                </div>
                <span class="progress-val">{{ patient.progression }}%</span>
              </td>
              <td class="font-bold">Niv. {{ patient.niveau }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

// Données fictives basées sur votre maquette
const patients = ref([
  { nom: "Jean Dupont", age: 72, statut: "Actif", derniereSeance: "Aujourd'hui", progression: 75, niveau: 5 },
  { nom: "Marie Martin", age: 68, statut: "Actif", derniereSeance: "Hier", progression: 60, niveau: 4 },
  { nom: "Pierre Durand", age: 80, statut: "Inactif", derniereSeance: "Il y a 3 jours", progression: 40, niveau: 3 },
  { nom: "Claire Bernard", age: 65, statut: "Actif", derniereSeance: "Aujourd'hui", progression: 90, niveau: 7 },
  { nom: "André Petit", age: 77, statut: "Actif", derniereSeance: "Hier", progression: 55, niveau: 4 },
  { nom: "Lucie Moreau", age: 70, statut: "Inactif", derniereSeance: "Il y a 5 jours", progression: 30, niveau: 2 }
])

// Fonction de recherche simple
const filteredPatients = computed(() => {
  return patients.value.filter(p => 
    p.nom.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
/* STRUCTURE ET LAYOUT */
.dashboard-layout {
  display: flex;
  height: 100vh;
  background-color: #F8FAFC;
}

/* SIDEBAR GAUCHE */
.sidebar {
  width: 280px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
  border-right: 1px solid #E2E8F0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-bottom: 40px;
}

.sidebar-logo {
  height: 40px;
}

.brand-name {
  font-weight: 900;
  color: #0A192F;
  font-size: 1.2rem;
  line-height: 1;
}

.brand-tag {
  font-size: 0.8rem;
  color: #6B7C93;
  margin-top: 2px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  text-decoration: none;
  color: #6B7C93;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #F1F5F9;
  color: #0A192F;
}

.menu-item.active {
  background-color: #00B8D9;
  color: white;
}

.sidebar-bottom {
  border-top: 1px solid #E2E8F0;
  padding-top: 25px;
}

.pro-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.pro-avatar {
  width: 40px;
  height: 40px;
  background-color: #20C997;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.pro-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0A192F;
}

.pro-mail {
  font-size: 0.75rem;
  color: #6B7C93;
}

.logout-link {
  background: none;
  border: none;
  color: #6B7C93;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  transition: color 0.2s;
}

.logout-link:hover {
  color: #FF4757;
}

/* CONTENU PRINCIPAL */
.main-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.content-header h1 {
  font-size: 2rem;
  color: #0A192F;
  font-weight: 800;
}

/* Barre de recherche */
.search-box {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #94A3B8;
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border-radius: 50px;
  border: 1px solid #E2E8F0;
  background-color: white;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: #00B8D9;
  box-shadow: 0 0 0 4px rgba(0, 184, 217, 0.1);
}

/* TABLEAU DES PATIENTS */
.table-wrapper {
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.patients-table {
  width: 100%;
  border-collapse: collapse;
}

.patients-table th {
  text-align: left;
  padding: 15px;
  color: #6B7C93;
  font-weight: 600;
  border-bottom: 1px solid #F1F5F9;
  font-size: 0.9rem;
}

.patients-table td {
  padding: 20px 15px;
  border-bottom: 1px solid #F8FAFC;
  font-size: 0.95rem;
  vertical-align: middle;
}

.font-bold { font-weight: 700; color: #0A192F; }
.text-muted { color: #6B7C93; }

/* Badges de statut */
.status-pill {
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
}

.status-pill.active {
  background-color: #E8F8F5;
  color: #20C997;
}

.status-pill.inactive {
  background-color: #F1F5F9;
  color: #94A3B8;
}

/* Barre de progression */
.progress-container {
  width: 100px;
  height: 8px;
  background-color: #E2E8F0;
  border-radius: 10px;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00B8D9, #20C997);
  border-radius: 10px;
}

.progress-val {
  font-size: 0.8rem;
  color: #6B7C93;
  margin-left: 10px;
  font-weight: 600;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
    padding: 30px 10px;
  }
  .brand-info, .menu-item span:not(.icon), .pro-info, .logout-link {
    display: none;
  }
  .menu-item {
    justify-content: center;
    padding: 15px;
  }
}
</style>