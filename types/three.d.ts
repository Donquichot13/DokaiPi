import type { Object3DNode } from '@react-three/fiber'
import type { Mesh, TorusGeometry, MeshBasicMaterial, AmbientLight, PointLight } from 'three'

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: Object3DNode<Mesh, typeof Mesh>
    torusGeometry: Object3DNode<TorusGeometry, typeof TorusGeometry>
    meshBasicMaterial: Object3DNode<MeshBasicMaterial, typeof MeshBasicMaterial>
    ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>
    pointLight: Object3DNode<PointLight, typeof PointLight>
  }
}
