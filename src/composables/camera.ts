import * as THREE from 'three'
import { onResize } from './utils'

const cameraDimensions = () => ({
  caps: window.innerHeight / 2,
  sides: window.innerWidth / 2
})

export function getCamera() {
  const { caps, sides } = cameraDimensions()
  const camera = new THREE.OrthographicCamera(
    -sides, sides,
    caps, -caps,
    -1000, 1000
  )

  camera.position.z = 500;
  onResize(() => updateCamera(camera))
  return camera
}

function updateCamera(camera: THREE.OrthographicCamera) {
  const { caps, sides } = cameraDimensions()
  camera.left = -sides,
  camera.right = sides,
  camera.top = caps,
  camera.bottom = -caps,
  camera.updateProjectionMatrix();
}