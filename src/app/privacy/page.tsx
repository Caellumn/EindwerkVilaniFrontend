import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  FileText,
} from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf3ee] to-[#f5f1ee]">
      {/* Header Section */}
      <div className="bg-[#5a3d2b] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-[#a5673f]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacybeleid</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Uw privacy is belangrijk voor ons. Lees hoe wij uw gegevens
            verzamelen, gebruiken en beschermen.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Section 1: Who We Are */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">
                Wie zijn wij?
              </h2>
            </div>
            <div className="bg-[#faf3ee] rounded-xl p-6 border border-[#a5673f]/20">
              <h3 className="text-xl font-semibold text-[#5a3d2b] mb-4">
                Kapsalon Vilani
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-[#5a3d2b]">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#a5673f] mr-3" />
                  <div>
                    <p className="font-medium">Puttestraat 3</p>
                    <p>2940 Stabroek, België</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#a5673f] mr-3" />
                  <p>03 294 48 33</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#a5673f] mr-3" />
                  <p>info@kapsalon-vilani.be</p>
                </div>
              </div>
              <p className="mt-4 text-[#5a3d2b]/80">
                Verantwoordelijke voor de verwerking van uw persoonsgegevens is
                de eigenaar van Kapsalon Vilani.
              </p>
            </div>
          </section>

          {/* Section 2: Data Collection */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">
                Welke gegevens verzamelen wij?
              </h2>
            </div>
            <p className="text-[#5a3d2b]/80 mb-6">
              Voor het maken van afspraken verzamelen wij de volgende gegevens:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: UserCheck, text: "Voor- en achternaam" },
                { icon: Mail, text: "E-mailadres" },
                { icon: Phone, text: "Telefoonnummer" },
                { icon: UserCheck, text: "Geslacht" },
                {
                  icon: FileText,
                  text: "Afsprakengegevens (datum, tijd, dienst)",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-[#faf3ee] rounded-lg border border-[#a5673f]/20"
                >
                  <item.icon className="h-5 w-5 text-[#a5673f] mr-3 flex-shrink-0" />
                  <span className="text-[#5a3d2b]">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Usage */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">
                Waarvoor gebruiken wij deze gegevens?
              </h2>
            </div>
            <p className="text-[#5a3d2b]/80 mb-6">
              Wij gebruiken uw gegevens uitsluitend voor de volgende doeleinden:
            </p>
            <ul className="space-y-3">
              {[
                "Inplannen en beheren van afspraken",
                "Contact opnemen bij wijziging of bevestiging van de afspraak",
                "Verbeteren van onze klantenservice",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-[#a5673f] text-white rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-[#5a3d2b]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Wij gebruiken geen cookies van derden en houden geen
                surfgedrag bij via onze website.
              </p>
            </div>
          </section>

          {/* Section 4: Data Sharing */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">
                Worden uw gegevens gedeeld?
              </h2>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">
                Uw gegevens worden <strong>niet gedeeld met derden</strong>,
                tenzij dit wettelijk verplicht is of noodzakelijk is voor de
                uitvoering van onze dienstverlening (bijvoorbeeld een agenda-app
                die onder een verwerkersovereenkomst valt).
              </p>
            </div>
          </section>

          {/* Section 5: Data Retention */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">5</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">
                Hoe lang bewaren wij uw gegevens?
              </h2>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">
                Wij bewaren uw gegevens <strong>maximaal 2 jaar</strong> na uw
                laatste afspraak, tenzij een langere bewaartermijn wettelijk
                vereist is.
              </p>
            </div>
          </section>

          {/* Section 6: Your Rights */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">6</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">Uw rechten</h2>
            </div>
            <p className="text-[#5a3d2b]/80 mb-6">U heeft het recht om:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Eye,
                  text: "Uw gegevens in te zien",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Edit,
                  text: "Onjuiste gegevens te laten corrigeren",
                  color: "bg-green-100 text-green-600",
                },
                {
                  icon: Trash2,
                  text: "Uw gegevens te laten verwijderen",
                  color: "bg-red-100 text-red-600",
                },
                {
                  icon: UserCheck,
                  text: "Uw toestemming in te trekken",
                  color: "bg-purple-100 text-purple-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className={`p-2 rounded-full mr-3 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[#5a3d2b] font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-700">
                <strong>Klacht indienen:</strong> U kunt een klacht indienen bij
                de Gegevensbeschermingsautoriteit via{" "}
                <a
                  href="https://www.gegevensbeschermingsautoriteit.be"
                  className="text-[#a5673f] hover:underline font-medium"
                >
                  gegevensbeschermingsautoriteit.be
                </a>
              </p>
            </div>
          </section>

          {/* Section 7: Security */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">7</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">Beveiliging</h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-green-800">
                  Wij nemen passende technische en organisatorische maatregelen
                  om uw gegevens te beschermen tegen verlies, misbruik of
                  onbevoegde toegang.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Contact */}
          <section className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-[#a5673f] text-white p-3 rounded-full mr-4">
                <span className="text-xl font-bold">8</span>
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b]">Contact</h2>
            </div>
            <div className="bg-[#5a3d2b] text-white rounded-xl p-6">
              <p className="mb-4 text-white/90">
                Voor vragen over deze privacyverklaring of de verwerking van uw
                gegevens, kunt u ons contacteren via:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="mailto:info@kapsalon-vilani.be"
                  className="flex items-center hover:text-[#a5673f] transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  info@kapsalon-vilani.be
                </a>
                <a
                  href="tel:+3232944833"
                  className="flex items-center hover:text-[#a5673f] transition-colors"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  03 294 48 33
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-[#5a3d2b]/60 text-sm">
            <p>Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
