"use client";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useCookie } from "@/hooks/use-cookies";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";

export function SimpleCookieBanner({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & HTMLMotionProps<"dialog">) {
  const defaultConsent = { consent: false, marketing: false };

  const [consentCookieValue, setConsentCookieValue, removeCookieConsent] =
    useCookie("consent_cookie", defaultConsent, {
      days: 365,
      sameSite: "lax",
      secure: true,
    });

  return (
    <>
      {/* TODO: Add a button to reset consent  delete in production*/}
      {process.env.NODE_ENV === "development" &&
        consentCookieValue.consent === true && (
          <button
            type="button"
            onClick={() => removeCookieConsent()}
            className="fixed bottom-20 right-4 z-40 px-4 py-2 bg-gray-600/80 text-white text-xs rounded-md hover:bg-gray-600"
          >
            Reset Cookies (Dev)
          </button>
        )}

      <AnimatePresence>
        {consentCookieValue.consent === false && (
          <motion.dialog
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            aria-describedby="cookie-banner-description"
            aria-labelledby="cookie-banner-title"
            className={cn(
              "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-96 z-50 flex flex-col gap-y-4 rounded-2xl border border-[#a5673f]/30 bg-white/95 backdrop-blur-md shadow-2xl p-6 text-sm text-[#5a3d2b]",
              className
            )}
            {...props}
          >
            <div>
              <h3
                id="cookie-banner-title"
                className="font-semibold text-[#5a3d2b] mb-2"
              >
                Cookie Voorkeuren
              </h3>
              <p
                id="cookie-banner-description"
                className="text-[#5a3d2b]/80 leading-relaxed"
              >
                {children ||
                  "Wij gebruiken cookies om uw ervaring te verbeteren en om onze diensten te analyseren. U kunt kiezen welke cookies u accepteert."}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <button
                className="flex-1 px-4 py-2 bg-[#a5673f] text-white rounded-lg hover:bg-[#8b5633] transition-colors duration-200 font-medium"
                type="button"
                onClick={() => {
                  setConsentCookieValue({ consent: true, marketing: true });
                }}
              >
                Alles Accepteren
              </button>
              <button
                className="flex-1 px-4 py-2 bg-[#faf3ee] text-[#5a3d2b] border border-[#a5673f]/30 rounded-lg hover:bg-[#f5f1ee] transition-colors duration-200 font-medium"
                type="button"
                onClick={() => {
                  setConsentCookieValue({ consent: true, marketing: false });
                }}
              >
                Alleen Noodzakelijk
              </button>
              <button
                className="flex-1 px-4 py-2 text-[#5a3d2b]/70 hover:text-[#5a3d2b] transition-colors duration-200 font-medium underline"
                type="button"
                onClick={() => {
                  setConsentCookieValue({ consent: true, marketing: false });
                }}
              >
                Weigeren
              </button>
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </>
  );
}

export default SimpleCookieBanner;
