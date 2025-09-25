import { GalleryGrid } from '@/components/GalleryGrid'

export const metadata = {
  title: 'Gallery - Inuka na Ploti',
  description: 'Explore our beautiful property gallery showcasing prime land investments across Kenya. View stunning images of our available properties.',
}

const galleryImages = [
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696813/Inuka_na_ploti_4_c9jcj4.jpg',
    title: 'Beachfront Property - Kilifi',
    location: 'Kilifi, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696810/Inuka_na_ploti_22_hvpnid.jpg',
    title: 'Hillside Development - Mtwapa',
    location: 'Mtwapa, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696809/Inuka_na_ploti_7_imlokv.jpg',
    title: 'Golf Course View - Vipingo',
    location: 'Vipingo Ridge, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696806/Inuka_na_ploti_17_wonzwy.jpg',
    title: 'Coastal Property - Malindi',
    location: 'Malindi, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696806/Inuka_na_ploti_23_h9lpfs.jpg',
    title: 'Town Center Plot - Kilifi',
    location: 'Kilifi Town, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696806/Inuka_na_ploti_3_o3knpc.jpg',
    title: 'Beachside Development - Watamu',
    location: 'Watamu, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696805/Inuka_na_ploti_15_yyna4g.jpg',
    title: 'Luxury Development - Vipingo',
    location: 'Vipingo Ridge, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696804/Inuka_na_ploti_14_qawfdz.jpg',
    title: 'Prime Location - Mtwapa',
    location: 'Mtwapa, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696804/Inuka_na_ploti_12_fhfceq.jpg',
    title: 'Investment Property - Kilifi',
    location: 'Kilifi, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696803/Inuka_na_ploti_13_hvpoqk.jpg',
    title: 'Coastal View - Malindi',
    location: 'Malindi, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696803/Inuka_na_ploti_11_xj6cx5.jpg',
    title: 'Beach Access Property - Watamu',
    location: 'Watamu, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696802/Inuka_na_ploti_25_jgkx1e.jpg',
    title: 'Development Site - Kilifi',
    location: 'Kilifi, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696801/Inuka_na_ploti_26_rudemo.jpg',
    title: 'Ocean View Plot - Watamu',
    location: 'Watamu, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696802/Inuka_na_ploti_8_uuunib.jpg',
    title: 'Town Center Investment - Kilifi',
    location: 'Kilifi Town, Kenya'
  },
  {
    url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696800/Inuka_na_ploti_9_o95o8d.jpg',
    title: 'Prime Development - Mtwapa',
    location: 'Mtwapa, Kenya'
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Property Gallery</h1>
            <p className="text-body max-w-2xl mx-auto">
              Explore our stunning collection of premium land investments across Kenya's most beautiful locations. 
              From beachfront properties to hillside developments, discover your perfect investment opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GalleryGrid 
          images={galleryImages.map(img => img.url)} 
          title="Property Gallery" 
        />
      </div>
    </div>
  )
}
