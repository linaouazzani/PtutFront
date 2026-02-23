<template>
  <header class="navbar container">
    <div class="logo-container">
      <img src="/Frame 11.png" alt="Logo Play 'N Ride" class="nav-logo-img">
      <span class="logo-text">Play <span class="text-cyan">'N</span> Ride</span>
    </div>
    
    <nav class="nav-links">
      <a href="#pourquoi">Le Concept</a>
      <a href="#pourqui">Pour qui ?</a>
      <a href="#temoignages">Témoignages</a>
      <a href="#contact">Contact</a>
    </nav>
    
    <div class="auth-buttons">
      <router-link to="/auth" class="btn btn-outline-blue" style="text-decoration: none; display: inline-flex; align-items: center;">
        Connexion
      </router-link>
      <router-link to="/auth" class="btn btn-solid-green" style="text-decoration: none; display: inline-flex; align-items: center;">
        S'INSCRIRE
      </router-link>
    </div>
  </header>
</template>