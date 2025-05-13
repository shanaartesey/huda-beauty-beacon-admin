
import { useData } from "@/lib/data-context";

const About = () => {
  const { companyInfo } = useData();

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-heading text-center mx-auto">About {companyInfo.name}</h1>
          
          <div className="my-12">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-beauty-pink rounded-lg transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?q=80&w=2664&auto=format&fit=crop" 
                alt="Huda Beauty Store" 
                className="rounded-lg relative z-10 w-full h-auto shadow-xl"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-6">
                Founded in {companyInfo.foundedYear} by award-winning beauty blogger Huda Kattan, {companyInfo.name} 
                has quickly risen to become one of the world's most beloved and influential beauty brands. What began 
                as a passion for makeup artistry and a popular beauty blog has transformed into a global beauty empire.
              </p>
              
              <p className="mb-6">
                {companyInfo.description}
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">Our Mission</h2>
              <p className="mb-6">
                At {companyInfo.name}, we believe beauty should be accessible, inclusive, and empowering. Our mission is 
                to create high-quality, innovative makeup and beauty products that help everyone express their unique beauty
                and feel confident in their own skin. We are committed to developing products that perform exceptionally well
                and are suitable for all skin types, tones, and beauty preferences.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-beauty-pink">Quality</h3>
                  <p>We never compromise on product quality, ensuring each item meets our high standards.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-beauty-pink">Inclusivity</h3>
                  <p>We create products for people of all backgrounds, skin tones, and beauty preferences.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-beauty-pink">Innovation</h3>
                  <p>We constantly push boundaries to bring new, exciting beauty solutions to market.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-beauty-pink">Community</h3>
                  <p>We value our beauty community and actively listen to feedback to improve our offerings.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">Our Commitment</h2>
              <p className="mb-6">
                As we continue to grow, we remain committed to our roots as a brand built on authenticity and passion 
                for beauty. We pledge to maintain the highest standards in product development, testing, and customer 
                experience. Our journey is one of continuous improvement, always striving to exceed expectations and 
                set new standards in the beauty industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
