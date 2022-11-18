
import * as THREE from 'three';
const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff22, wireframe: true })

type Material = THREE.ShaderMaterial | THREE.MeshBasicMaterial
interface planeType {
  width: number;
  height: number;
  material: Material;
}

export function addPlane(scene: THREE.Scene, {width, height, material = defaultMaterial}: planeType) {
  const geometry = new THREE.PlaneGeometry(width, height, 40, 40)
  const plane = new THREE.Mesh(geometry, material)
  scene.add( plane )
  return plane
}

export function usePlane(scene: THREE.Scene, element: HTMLImageElement, material: Material) {
  const { width, height } = element.getBoundingClientRect()
  const plane = addPlane(scene, {width, height, material})
  element.classList.add("proxy")

  function attach(geo: THREE.Mesh<THREE.PlaneGeometry, Material>) {
    const el = element.getBoundingClientRect()
    const worldReset = {
      top:  window.innerHeight / 2,
      left: - window.innerWidth / 2
    }
  
    const elementPosition = {
      x: el.x + (el.width / 2),
      y: -(el.y + (el.height / 2))
    }

    geo.position.x = worldReset.left + elementPosition.x
    geo.position.y = worldReset.top + elementPosition.y
  }

  attach(plane)
  return { plane, attach }
}

export function imageTexture(element: HTMLImageElement) {
  //const { width, height } = element.getBoundingClientRect()
  //const aspect = width / height
  //const t1 = new THREE.TextureLoader().load(element.src, (tex) => coverPlane(tex, aspect))
  return new THREE.Texture(element)
}

export function useImage(scene: THREE.Scene | null, element: HTMLImageElement | null, material: Material | null) {
  //material && (material = new THREE.MeshBasicMaterial({map: imageTexture(element)}))
  const condition = scene && element && material ? true : false
  condition ? console.log("lol", condition) : console.log("nope", condition)
  return condition ? usePlane(scene, element, material) : {plane: null, attach: null}
}

export function coverPlane(texture: THREE.Texture, aspect: number) {
  texture.matrixAutoUpdate = false
  var imageAspect = texture.image.width / texture.image.height;
  aspect < imageAspect
    ? texture.matrix.setUvTransform( 0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5 )
    : texture.matrix.setUvTransform( 0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5 )
}
