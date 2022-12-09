
import * as THREE from 'three';
const defaultMaterial = new THREE.MeshBasicMaterial({ 
  color: 0x00ff22, 
  wireframe: true 
})

type Material = THREE.ShaderMaterial | THREE.MeshBasicMaterial
interface planeType {
  width: number;
  height: number;
  material: Material;
}

type geoType = THREE.Mesh<THREE.PlaneGeometry, Material>

export function addPlane(scene: THREE.Scene, {width, height, material = defaultMaterial}: planeType) {
  const geometry = new THREE.PlaneGeometry(width, height, 40, 40)
  const plane = new THREE.Mesh(geometry, material)
  scene.add( plane )
  return plane
}

function attach(geo: geoType, element: HTMLElement) {
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

interface planeProps {
  scene: THREE.Scene | null;
  element: HTMLImageElement | null;
  material: Material | null;
}

export interface planeInterface {
  plane: THREE.Mesh<THREE.PlaneGeometry, Material> | null;
  attach: (geo: geoType, element: HTMLElement) => void;
  element: HTMLImageElement | null;
}

export function usePlane({scene, element, material}: planeProps): planeInterface {
  const condition = scene === null || element === null || material === null
  if(condition) {
    return {plane: null, attach: () => {}, element: null}
  } else {
    const { width, height } = element.getBoundingClientRect()
    const plane = addPlane(scene, {width, height, material})
    element.classList.add("proxy")
    attach(plane, element)
    return { plane, attach: (p = plane) => attach(p, element), element }
  }
}

export function useImage({scene, element, material}: planeProps): planeInterface {
  const empty: planeInterface = {plane: null, attach: () => {}, element: null}
  const condition = scene && element && material ? true : false
  return condition 
    ? usePlane({scene, element, material})
    : empty
}
