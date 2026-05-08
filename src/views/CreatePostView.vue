<template>
  <div class="create-post-view">
    <!-- Header -->
    <header class="create-header">
      <button class="back-btn" @click="handleCancel" aria-label="Cancelar">
        <MaterialIcon name="arrow_back" :size="24" />
      </button>
      <h1>Crear Nuevo Post</h1>
      <button 
        v-if="currentStep === 3"
        class="publish-btn"
        @click="handlePublish"
        :disabled="!canPublish"
      >
        Publicar
      </button>
      <div v-else class="placeholder"></div>
    </header>

    <!-- Step 1: Permission Request -->
    <div v-if="currentStep === 1" class="step-container permission-step">
      <div class="permission-content">
        <div class="icon-container">
          <MaterialIcon name="photo_library" :size="80" />
        </div>
        <h2>Acceso a tus fotos</h2>
        <p>Necesitamos acceso a tu biblioteca de fotos para que puedas compartir tus mejores outfits.</p>
        <button class="primary-btn" @click="requestPhotoAccess">
          Permitir acceso
        </button>
        <button class="secondary-btn" @click="handleCancel">
          Ahora no
        </button>
      </div>
    </div>

    <!-- Step 2: Image Selection -->
    <div v-if="currentStep === 2" class="step-container selection-step">
      <div class="selection-content">
        <div 
          class="upload-zone" 
          :class="{ 'drag-over': isDragging }"
          @click="triggerFileInput"
          @dragover.prevent="handleDragOver"
          @dragenter.prevent="handleDragEnter"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
        >
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*"
            @change="handleFileChange"
            class="file-input"
          />
          <MaterialIcon name="upload" :size="64" />
          <h3>{{ isDragging ? 'Suelta la foto aquí' : 'Selecciona una foto' }}</h3>
          <p>{{ isDragging ? '¡Suéltala para continuar!' : 'Arrastra y suelta o haz clic para seleccionar' }}</p>
          <small>PNG, JPG o GIF hasta 5MB</small>
        </div>
      </div>
    </div>

    <!-- Step 3: Preview & Details -->
    <div v-if="currentStep === 3" class="step-container preview-step">
      <div class="image-preview-large">
        <img :src="imagePreview" alt="Vista previa" />
      </div>
      
      <div class="post-details-form">
        <div class="form-group">
          <label for="post-title" class="form-label">Título *</label>
          <input 
            id="post-title"
            v-model="formData.title"
            type="text" 
            class="form-input"
            placeholder="Ej: Look casual de otoño"
            maxlength="100"
          />
        </div>

        <div class="form-group">
          <label for="post-description" class="form-label">Descripción</label>
          <textarea 
            id="post-description"
            v-model="formData.description"
            class="form-textarea"
            placeholder="Describe tu outfit..."
            rows="3"
            maxlength="500"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Tags</label>
          <div class="tags-input-container">
            <div class="tags-list">
              <span v-for="(tag, index) in formData.tags" :key="index" class="tag-chip">
                {{ tag }}
                <button type="button" @click="removeTag(index)" class="tag-remove">
                  <MaterialIcon name="close" :size="14" />
                </button>
              </span>
            </div>
            <input 
              v-model="currentTag"
              type="text" 
              class="tag-input"
              placeholder="Agregar tag..."
              @keydown.enter.prevent="addTag"
              @keydown.comma.prevent="addTag"
            />
          </div>
          <small class="form-hint">Presiona Enter o coma para agregar tags</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref(1)
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string>('')
const selectedFile = ref<File | null>(null)
const currentTag = ref('')
const isDragging = ref(false)

const formData = ref({
  title: '',
  description: '',
  tags: [] as string[]
})

const canPublish = computed(() => {
  return formData.value.title.trim().length > 0 && imagePreview.value
})

function requestPhotoAccess() {
  currentStep.value = 2
}

function triggerFileInput() {
  fileInput.value?.click()
}

function processFile(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    alert('La imagen es muy grande. Tamaño máximo: 5MB')
    return
  }

  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona una imagen válida')
    return
  }

  selectedFile.value = file
  const reader = new FileReader()
  
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
    currentStep.value = 3
  }
  
  reader.readAsDataURL(file)
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    processFile(file)
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  
  const file = event.dataTransfer?.files[0]
  if (file) {
    processFile(file)
  }
}

function addTag() {
  const tag = currentTag.value.trim().replace(',', '')
  if (tag && !formData.value.tags.includes(tag) && formData.value.tags.length < 10) {
    formData.value.tags.push(tag)
    currentTag.value = ''
  }
}

function removeTag(index: number) {
  formData.value.tags.splice(index, 1)
}

function handleCancel() {
  if (confirm('¿Seguro que quieres salir? Se perderán los cambios.')) {
    router.push('/')
  }
}

function handlePublish() {
  if (!canPublish.value) return

  console.log('Publishing post:', {
    file: selectedFile.value?.name,
    ...formData.value
  })

  // TODO: Integrate with Firebase Storage
  alert('Post publicado con éxito! 🎉')
  router.push('/')
}
</script>

<style scoped lang="scss">
.create-post-view {
  min-height: 100vh;
  background: #faf8f5;
  display: flex;
  flex-direction: column;
}

.create-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #e0d8cc;
  
  h1 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0;
  }
}

.back-btn,
.publish-btn,
.placeholder {
  min-width: 80px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: none;
  border: none;
  color: #4a4238;
  cursor: pointer;
  font-size: 0.9375rem;
  
  &:hover {
    color: #c67b5c;
  }
}

.publish-btn {
  padding: 0.5rem 1rem;
  background: #c67b5c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #b56a4d;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #e0d8cc;
    cursor: not-allowed;
  }
}

.step-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.permission-step,
.selection-step {
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.permission-content {
  max-width: 400px;
  text-align: center;
  
  .icon-container {
    width: 120px;
    height: 120px;
    margin: 0 auto 2rem;
    background: #fff5f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .material-icon {
      color: #c67b5c;
    }
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 1rem;
  }
  
  p {
    font-size: 1rem;
    color: #7c6a5b;
    line-height: 1.6;
    margin: 0 0 2rem;
  }
}

.primary-btn,
.secondary-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.primary-btn {
  background: #c67b5c;
  color: white;
  margin-bottom: 0.75rem;
  
  &:hover {
    background: #b56a4d;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(198, 123, 92, 0.3);
  }
}

.secondary-btn {
  background: transparent;
  color: #7c6a5b;
  border: 1px solid #e0d8cc;
  
  &:hover {
    background: #f0ebe6;
  }
}

.selection-content {
  width: 100%;
  max-width: 500px;
}

.upload-zone {
  background: white;
  border: 2px dashed #e0d8cc;
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #c67b5c;
    background: #fff5f0;
    
    .material-icon {
      color: #c67b5c;
      transform: translateY(-4px);
    }
  }
  
  .material-icon {
    color: #7c6a5b;
    margin-bottom: 1.5rem;
    transition: all 0.3s;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 0.5rem;
    transition: color 0.3s;
  }
  
  p {
    font-size: 0.9375rem;
    color: #7c6a5b;
    margin: 0 0 0.5rem;
    transition: color 0.3s;
  }
  
  small {
    font-size: 0.8125rem;
    color: #b8a99a;
  }
  
  &.drag-over {
    border-color: #c67b5c;
    background: #fff5f0;
    border-width: 3px;
    transform: scale(1.02);
    
    .material-icon {
      color: #c67b5c;
      transform: translateY(-8px) scale(1.1);
    }
    
    h3, p {
      color: #c67b5c;
    }
  }
}

.file-input {
  display: none;
}

.preview-step {
  overflow-y: auto;
}

.image-preview-large {
  width: 100%;
  max-height: 60vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.post-details-form {
  padding: 1.5rem;
  background: white;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0d8cc;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  color: #4a4238;
  background: #faf8f5;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #c67b5c;
    background: white;
  }
  
  &::placeholder {
    color: #b8a99a;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.tags-input-container {
  border: 1px solid #e0d8cc;
  border-radius: 8px;
  padding: 0.5rem;
  background: #faf8f5;
  min-height: 60px;
  
  &:focus-within {
    border-color: #c67b5c;
    background: white;
  }
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: #c67b5c;
  color: white;
  border-radius: 16px;
  font-size: 0.875rem;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 0.8;
  }
}

.tag-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #4a4238;
  outline: none;
  
  &::placeholder {
    color: #b8a99a;
  }
}

.form-hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: #7c6a5b;
}

@media (min-width: 768px) {
  .image-preview-large {
    max-height: 70vh;
  }
  
  .post-details-form {
    padding: 2rem;
  }
}
</style>
