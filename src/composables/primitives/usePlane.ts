
import * as THREE from 'three';

type Material = THREE.ShaderMaterial | THREE.MeshBasicMaterial
type geoType = THREE.Mesh<THREE.PlaneGeometry, Material>

export function addPlane(scene: THREE.Scene, material: Material) {
  const divisions = 10
  const geometry = new THREE.PlaneGeometry(1, 1, divisions, divisions)
  const plane = new THREE.Mesh(geometry, material)
  scene.add( plane )
  return plane
}

function attach(geo: geoType, element: HTMLElement) {
  const { width, height, x, y } = element.getBoundingClientRect()

  const worldReset = {
    top:  window.innerHeight / 2,
    left: - window.innerWidth / 2
  }

  const elementPosition = {
    x: x + (width / 2),
    y: -(y + (height / 2))
  }

  geo.position.x = worldReset.left + elementPosition.x
  geo.position.y = worldReset.top + elementPosition.y
  geo.scale.set(width, height, 1)
}

interface planeProps {
  scene: THREE.Scene | null;
  element: HTMLImageElement | null;
  material: Material | null;
}

export interface planeInterface {
  plane: THREE.Mesh<THREE.PlaneGeometry, Material> | null;
  attach: (geo: geoType, element: HTMLElement, bool?: boolean) => void;
  element: HTMLImageElement | null;
}

export function usePlane({scene, element, material}: planeProps): planeInterface {
  const condition = scene === null || element === null || material === null
  if(condition) {
    return {plane: null, attach: () => {}, element: null}
  } else {
    const plane = addPlane(scene, material)
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
