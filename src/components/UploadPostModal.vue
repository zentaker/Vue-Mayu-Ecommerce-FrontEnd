<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="handleClose">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Crear Nuevo Post</h2>
          <button class="close-btn" @click="handleClose" aria-label="Cerrar">
            <MaterialIcon name="close" :size="24" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-group">
            <label for="upload-image" class="form-label">Imagen *</label>
            <div class="image-upload-area" @click="triggerFileInput">
              <input 
                ref="fileInput"
                id="upload-image"
                type="file" 
                accept="image/*"
                @change="handleFileChange"
                class="file-input"
                required
              />
              <div v-if="!imagePreview" class="upload-placeholder">
                <MaterialIcon name="add_photo_alternate" :size="52" />
                <p>Click para seleccionar imagen</p>
                <span>PNG, JPG hasta 5MB</span>
              </div>
              <div v-else class="image-preview">
                <img :src="imagePreview" alt="Vista previa" />
                <button type="button" class="remove-image-btn" @click.stop="removeImage">
                  <MaterialIcon name="close" :size="20" />
                </button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="upload-title" class="form-label">Título *</label>
            <input 
              id="upload-title"
              v-model="formData.title"
              type="text" 
              class="form-input"
              placeholder="Ej: Look casual de otoño"
              maxlength="100"
              required
            />
          </div>

          <div class="form-group">
            <label for="upload-description" class="form-label">Descripción (opcional)</label>
            <textarea 
              id="upload-description"
              v-model="formData.description"
              class="form-textarea"
              placeholder="Describe tu outfit..."
              rows="3"
              maxlength="500"
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Tags (opcional)</label>
            <div class="tags-input">
              <span v-for="tag in formData.tags" :key="tag" class="tag">
                {{ tag }}
                <button type="button" @click="removeTag(tag)" aria-label="Quitar tag">
                  <MaterialIcon name="close" :size="14" />
                </button>
              </span>
              <input 
                v-model="newTag"
                type="text" 
                class="tag-input"
                placeholder="Agregar tag..."
                @keydown.enter.prevent="addTag"
                @keydown.comma.prevent="addTag"
              />
            </div>
            <p class="form-hint">Presiona Enter o coma para agregar</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleClose">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary" :disabled="!isValid || isSubmitting">
              {{ isSubmitting ? 'Publicando...' : 'Publicar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'close': []
  'submit': [data: { image: File; title: string; description: string; tags: string[] }]
}>()

const fileInput = ref<HTMLInputElement>()
const imagePreview = ref<string>('')
const imageFile = ref<File | null>(null)
const isSubmitting = ref(false)

const formData = ref({
  title: '',
  description: '',
  tags: [] as string[]
})

const newTag = ref('')

const isValid = computed(() => {
  return imageFile.value && formData.value.title.trim().length > 0
})

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede ser mayor a 5MB')
      return
    }
    
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function addTag() {
  const tag = newTag.value.trim().toLowerCase()
  if (tag && !formData.value.tags.includes(tag) && formData.value.tags.length < 10) {
    formData.value.tags.push(tag)
    newTag.value = ''
  }
}

function removeTag(tag: string) {
  formData.value.tags = formData.value.tags.filter(t => t !== tag)
}

function handleClose() {
  if (!isSubmitting.value) {
    resetForm()
    emit('close')
  }
}

function resetForm() {
  formData.value = {
    title: '',
    description: '',
    tags: []
  }
  imageFile.value = null
  imagePreview.value = ''
  newTag.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function handleSubmit() {
  if (!isValid.value || isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    emit('submit', {
      image: imageFile.value!,
      title: formData.value.title,
      description: formData.value.description,
      tags: formData.value.tags
    })
    
    setTimeout(() => {
      resetForm()
      emit('close')
      isSubmitting.value = false
    }, 500)
  } catch (error) {
    console.error('Error al publicar:', error)
    alert('Hubo un error al publicar. Intenta de nuevo.')
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  background: #faf8f5;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e0d8cc;
  position: sticky;
  top: 0;
  background: #faf8f5;
  z-index: 1;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: #7c6a5b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: #f0ebe6;
    color: #4a4238;
  }
}

.modal-body {
  padding: 1.5rem;
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

.image-upload-area {
  border: 2px dashed #e0d8cc;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  background: white;
  
  &:hover {
    border-color: #c67b5c;
    background: #fff5f0;
  }
}

.file-input {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: #7c6a5b;
  
  .material-icon {
    color: #e0d8cc;
    margin-bottom: 1rem;
  }
  
  p {
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #4a4238;
  }
  
  span {
    font-size: 0.875rem;
  }
}

.image-preview {
  position: relative;
  aspect-ratio: 4/3;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.remove-image-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  color: #dc3545;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #fee;
    transform: scale(1.05);
  }
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0d8cc;
  border-radius: 8px;
  font-size: 1rem;
  color: #4a4238;
  background: white;
  transition: all 0.2s;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #c67b5c;
    box-shadow: 0 0 0 3px rgba(198, 123, 92, 0.1);
  }
  
  &::placeholder {
    color: #b5a89a;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e0d8cc;
  border-radius: 8px;
  background: white;
  min-height: 44px;
  
  &:focus-within {
    border-color: #c67b5c;
    box-shadow: 0 0 0 3px rgba(198, 123, 92, 0.1);
  }
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #f0ebe6;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #4a4238;
  
  button {
    background: none;
    border: none;
    color: #7c6a5b;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    
    &:hover {
      color: #dc3545;
    }
  }
}

.tag-input {
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  padding: 0.25rem;
  font-size: 0.875rem;
  color: #4a4238;
  background: transparent;
  
  &::placeholder {
    color: #b5a89a;
  }
}

.form-hint {
  font-size: 0.8125rem;
  color: #7c6a5b;
  margin: 0.5rem 0 0;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e0d8cc;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-secondary {
  background: #f0ebe6;
  color: #4a4238;
  
  &:hover:not(:disabled) {
    background: #e0d8cc;
  }
}

.btn-primary {
  background: #c67b5c;
  color: white;
  
  &:hover:not(:disabled) {
    background: #b56a4d;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
  
  .modal-content {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  
  .modal-content {
    transform: scale(0.9) translateY(20px);
  }
}
</style>
