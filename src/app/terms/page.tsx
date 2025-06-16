import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kapsalon Vilani - Algemene Voorwaarden",
  description: "Algemene Voorwaarden voor Kapsalon Vilani",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Algemene Voorwaarden
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">
              Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL")}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Afsprakenbeleid
              </h2>
              <ul className="space-y-2 ml-6">
                <li>• Alle afspraken moeten vooraf geboekt worden</li>
                <li>
                  • Een annulering van 24 uur van tevoren is vereist om
                  annuleringskosten te vermijden
                </li>
                <li>
                  • Te laat komen kan leiden tot verkorte behandeltijd of het
                  verplaatsen van de afspraak
                </li>
                <li>
                  • Bij het niet verschijnen wordt 50% van de behandelkosten in
                  rekening gebracht
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Betalingsvoorwaarden
              </h2>
              <ul className="space-y-2 ml-6">
                <li>
                  • Betaling is verschuldigd op het moment van de behandeling
                </li>
                <li>
                  • Wij accepteren contant geld, creditcards en digitale
                  betalingen
                </li>
                <li>• Fooien worden gewaardeerd maar zijn niet verplicht</li>
                <li>
                  • Prijzen kunnen zonder voorafgaande kennisgeving worden
                  gewijzigd
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Servicebeleid
              </h2>
              <ul className="space-y-2 ml-6">
                <li>
                  • Consultatie is vereist voor alle chemische behandelingen
                </li>
                <li>
                  • Wij behouden ons het recht voor om service te weigeren als
                  de haarconditioner niet geschikt is
                </li>
                <li>• Kleurcorrecties kunnen meerdere afspraken vereisen</li>
                <li>
                  • Resultaten kunnen variëren op basis van individueel haartype
                  en conditie
                </li>
                <li>
                  • Wij zijn niet verantwoordelijk voor haarschade door eerdere
                  chemische behandelingen
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Gezondheid en Veiligheid
              </h2>
              <ul className="space-y-2 ml-6">
                <li>
                  • Informeer ons over eventuele allergieën of
                  hoofdhuidaandoeningen
                </li>
                <li>
                  • Plaktests worden aanbevolen voor eerste kleurbehandelingen
                </li>
                <li>
                  • Wij handhaven strikte sanitaire normen voor alle
                  gereedschappen en apparatuur
                </li>
                <li>
                  • Klanten met besmettelijke aandoeningen worden gevraagd hun
                  afspraak te verplaatsen
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Aansprakelijkheid en Disclaimers
              </h2>
              <ul className="space-y-2 ml-6">
                <li>
                  • Wij zijn niet aansprakelijk voor allergische reacties
                  ondanks plaktests
                </li>
                <li>
                  • Haarschade door eerdere behandelingen valt niet onder onze
                  verantwoordelijkheid
                </li>
                <li>
                  • Wij zijn niet verantwoordelijk voor verloren of gestolen
                  persoonlijke bezittingen
                </li>
                <li>
                  • Serviceresultaten kunnen niet worden gegarandeerd vanwege
                  individuele haarvariaties
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Privacybeleid
              </h2>
              <ul className="space-y-2 ml-6">
                <li>• Klantinformatie wordt vertrouwelijk en veilig bewaard</li>
                <li>
                  • Foto&apos;s kunnen worden gemaakt voor portfoliodoeleinden
                  met toestemming
                </li>
                <li>
                  • Contactinformatie wordt alleen gebruikt voor
                  afspraakherinneringen
                </li>
                <li>• Wij delen klantinformatie niet met derden</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Restitutie- en Tevredenheidsbeleid
              </h2>
              <ul className="space-y-2 ml-6">
                <li>• Wij streven naar 100% klanttevredenheid</li>
                <li>
                  • Klachten moeten binnen 48 uur na de service worden gemeld
                </li>
                <li>• Gratis correcties worden aangeboden wanneer nodig</li>
                <li>• Restituties worden per geval beoordeeld</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Wijzigingen in Voorwaarden
              </h2>
              <p>
                Wij behouden ons het recht voor om deze voorwaarden op elk
                moment te wijzigen. Wijzigingen worden geplaatst op onze website
                en in onze salon. Voortgezet gebruik van onze diensten houdt
                acceptatie van eventuele wijzigingen in.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Contactinformatie
              </h2>
              <p>
                Als u vragen heeft over deze Algemene Voorwaarden, neem dan
                contact met ons op:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Kapsalon Vilani</p>
                <p>E-mail: info@kapsalon-vilani.be</p>
                <p>Telefoon: 03 294 48 33</p>
                <p>Adres: Puttestraat 3, 2940 Stabroek, België</p>
              </div>
            </section>

            <div className="border-t pt-8 mt-8">
              <p className="text-center text-gray-600">
                Door het boeken van een afspraak of het gebruik van onze
                diensten, gaat u akkoord met deze algemene voorwaarden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
