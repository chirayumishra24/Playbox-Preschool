import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { useEffect, useRef } from 'react'

import './CircularGallery.css'

function lerp(start, end, amount) {
  return start + (end - start) * amount
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance)
    }
  })
}

function createTextTexture(gl, text, font = '700 28px Fredoka, sans-serif', color = '#ffffff') {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = font
  const textWidth = Math.ceil(context.measureText(text).width)
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2)

  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas

  return { texture, width: canvas.width, height: canvas.height }
}

class Title {
  constructor({ gl, plane, text, textColor = '#ffffff', font = '700 28px Fredoka, sans-serif' }) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor)

    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
      },
      transparent: true,
    })

    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    viewport,
    textColor,
    borderRadius = 0,
    font,
  }) {
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.baseScaleX = 1
    this.baseScaleY = 1

    this.createShader()
    this.createMesh()
    this.createTitle()
    this.onResize()
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
    })

    this.program = new Program(this.gl, {
      depthTest: true,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.2 + cos(p.y * 2.0 + uTime) * 1.2) * (0.08 + uSpeed * 0.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    })

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })
    this.plane.setParent(this.scene)
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    })
  }

  updateOrbit(angle, orbitConfig) {
    const baseAngle = (this.index / this.length) * Math.PI * 2
    const theta = baseAngle + angle

    const x = Math.cos(theta) * orbitConfig.radiusX
    const y = Math.sin(theta) * orbitConfig.radiusY
    const z = Math.sin(theta) * orbitConfig.radiusZ
    const depthFactor = (z + orbitConfig.radiusZ) / (2 * orbitConfig.radiusZ)
    const scale = 0.68 + depthFactor * 0.55

    this.plane.position.set(x, y, z)
    this.plane.scale.set(this.baseScaleX * scale, this.baseScaleY * scale, 1)
    this.plane.rotation.y = -Math.cos(theta) * 0.22
    this.plane.rotation.z = Math.sin(theta) * 0.12

    this.program.uniforms.uTime.value += 0.03 + orbitConfig.speed * 0.015
    this.program.uniforms.uSpeed.value = orbitConfig.speed
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) this.viewport = viewport

    const scale = this.screen.height / 1500
    this.baseScaleY = (this.viewport.height * (900 * scale)) / this.screen.height
    this.baseScaleX = (this.viewport.width * (700 * scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.baseScaleX, this.baseScaleY]
  }
}

class OglGalleryApp {
  constructor(
    container,
    {
      items,
      textColor = '#ffffff',
      borderRadius = 0,
      font = '700 28px Fredoka, sans-serif',
      scrollSpeed = 2,
      scrollEase = 0.05,
    } = {},
  ) {
    this.container = container
    this.angle = { current: 0, target: 0, ease: scrollEase }
    this.autoVelocity = 0.0035 * scrollSpeed
    this.orbit = {
      radiusX: 1,
      radiusY: 1,
      radiusZ: 4.2,
      speed: scrollSpeed,
    }

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, textColor, borderRadius, font)
    this.update()
    this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    })
  }

  createMedias(items, textColor, borderRadius, font) {
    const galleryItems = items && items.length
      ? items
      : [
          { image: 'https://picsum.photos/seed/1/1200/800', text: 'Playbox' },
          { image: 'https://picsum.photos/seed/2/1200/800', text: 'Moments' },
        ]

    this.medias = galleryItems.map((data, index) => new Media({
      geometry: this.planeGeometry,
      gl: this.gl,
      image: data.image,
      index,
      length: galleryItems.length,
      scene: this.scene,
      screen: this.screen,
      text: data.text,
      viewport: this.viewport,
      textColor,
      borderRadius,
      font,
    }))
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    }

    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    })

    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }

    this.orbit.radiusX = this.viewport.width * 0.36
    this.orbit.radiusY = this.viewport.height * 0.24
    this.orbit.radiusZ = this.viewport.width * 0.14

    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }))
    }
  }

  update() {
    this.angle.target += this.autoVelocity
    this.angle.current = lerp(this.angle.current, this.angle.target, this.angle.ease)

    if (this.medias) {
      this.medias.forEach((media) => media.updateOrbit(this.angle.current, this.orbit))
    }

    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    window.addEventListener('resize', this.boundOnResize)
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

export default function CircularGallery({
  items,
  bend = 1,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = '700 28px Fredoka, sans-serif',
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const app = new OglGalleryApp(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    })

    return () => {
      app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase])

  return <div className="circular-gallery" ref={containerRef} />
}
