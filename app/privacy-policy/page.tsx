import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how CompilePilot handles information when you use our web scraping services, online tools, coding tools, compiler, and blog.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sectionClass = "scroll-mt-24";
const headingClass = "mb-3 text-xl font-semibold text-slate-900";
const paragraphClass = "mb-4 leading-7 text-slate-600";
const listClass = "mb-4 list-disc space-y-2 pl-6 leading-7 text-slate-600";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:py-24">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white px-6 py-10 shadow-sm ring-1 ring-slate-200 sm:px-10 sm:py-14">
        <header className="mb-10 border-b border-slate-200 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-600">
            CompilePilot
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: November 17, 2026
          </p>
        </header>

        <p className={paragraphClass}>
          This Privacy Policy explains how CompilePilot (“CompilePilot,” “we,”
          “us,” or “our”) handles information when you visit compilepilot.com
          (the “website”) or use our web scraping and data services, online
          utilities, coding tools, compiler, or blog. Please read this policy
          together with any notices shown in a particular tool or service.
        </p>

        <p className={paragraphClass}>
          By using the website, you acknowledge this policy. If you do not agree
          with it, please do not use the website or submit information to us.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. Information we may collect</h2>
          <p className={paragraphClass}>
            The information collected depends on how you use CompilePilot. It
            may include:
          </p>
          <ul className={listClass}>
            <li>
              <strong>Information you provide:</strong> your name, email
              address, phone number, and the details of a question, service
              inquiry, or other message you send us.
            </li>
            <li>
              <strong>Tool inputs and files:</strong> text, source code, URLs,
              or files you choose to enter or upload when using a tool. Some
              tools process content in your browser; other features may send it
              to CompilePilot or a third-party processing provider to perform
              the requested operation.
            </li>
            <li>
              <strong>Basic usage and device information:</strong> information
              such as pages viewed, referring page, approximate location
              inferred from an IP address, browser and device type, and the date
              and time of a visit. This information may be recorded by our
              hosting, security, or analytics services.
            </li>
          </ul>
          <p className={paragraphClass}>
            Please do not enter sensitive personal information, passwords,
            payment-card details, or confidential material into a tool unless
            you have confirmed that the tool is suitable for that information.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. How we use information</h2>
          <p className={paragraphClass}>We may use information to:</p>
          <ul className={listClass}>
            <li>operate, provide, and maintain the website and its tools;</li>
            <li>respond to questions and evaluate service requests;</li>
            <li>diagnose errors, protect the website, and prevent abuse;</li>
            <li>understand website usage and improve content and features; and</li>
            <li>
              display, measure, and limit advertising, where advertising is
              enabled and permitted by your preferences and applicable law.
            </li>
          </ul>
          <p className={paragraphClass}>
            We do not intentionally use source code, files, or other content
            submitted to a tool to create advertising profiles. A third-party
            processor may handle tool inputs as needed to provide that tool;
            its own privacy terms may also apply.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Web scraping and data services</h2>
          <p className={paragraphClass}>
            If you ask us about a scraping or data-extraction project, we may
            use the contact details and project requirements you provide to
            evaluate, discuss, and deliver that service. Depending on the
            project, this may include website URLs, requested data fields,
            locations, and output preferences.
          </p>
          <p className={paragraphClass}>
            Publicly available information collected from third-party websites
            as part of a requested project is distinct from your personal
            information. The collection and use of that information depend on
            the project scope and applicable requirements. Please do not send
            us information you are not authorized to share.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            4. Online tools, coding tools, and compiler
          </h2>
          <p className={paragraphClass}>
            Some formatters, converters, and other utilities may work locally
            in your browser. Other tools, including certain PDF or image
            operations, may transmit the input or uploaded file to a CompilePilot
            endpoint or an external provider to complete the operation. Online
            code execution may run in your browser or, when remote execution is
            configured, send your code and input to Judge0/RapidAPI or another
            execution provider. The provider may process information under its
            own privacy policy and terms.
          </p>
          <p className={paragraphClass}>
            Processing behavior can differ by tool and configuration. Check the
            relevant tool interface and provider terms before submitting
            sensitive content. We do not promise that every tool input is
            stored, deleted, or retained for the same period.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Cookies, analytics, and advertising</h2>
          <p className={paragraphClass}>
            CompilePilot and service providers may use cookies, pixels, local
            storage, or similar technologies for essential website functions,
            analytics, security, and advertising. You can manage cookies in
            your browser settings; blocking some cookies may affect website
            functionality.
          </p>
          <p className={paragraphClass}>
            We use Google Analytics when it is enabled in our website
            configuration to understand traffic and improve the website. Google
            may process usage information under its own privacy terms.
          </p>
          <p className={paragraphClass}>
            If Google AdSense or other advertising is enabled, Google and other
            advertising partners may use cookies or similar technologies to
            show, measure, and limit ads. These technologies may use information
            about visits to this and other websites to provide personalized or
            non-personalized advertising, subject to your settings, consent, and
            applicable law. Google may provide settings for managing ad
            personalization. Your browser and applicable regional consent tools
            may provide additional choices.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. When information is shared</h2>
          <p className={paragraphClass}>
            We may share information with service providers that help us host,
            secure, analyze, or operate the website and tools, including
            analytics, advertising, and code or file-processing providers. They
            may process information to provide their services to us and may
            have separate privacy terms. We may also disclose information when
            required by law, to protect rights and safety, or in connection with
            a business transfer. We do not sell personal information for money.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Data retention and security</h2>
          <p className={paragraphClass}>
            We keep information for as long as reasonably necessary for the
            purposes described in this policy, to provide a requested service,
            resolve issues, and meet legal obligations. Retention periods may
            differ between CompilePilot and third-party providers. We use
            reasonable safeguards, but no internet transmission or storage
            method can be guaranteed to be completely secure.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Your choices and privacy rights</h2>
          <p className={paragraphClass}>
            Depending on where you live, you may have rights to request access
            to, correction of, deletion of, or a copy of personal information,
            or to object to or restrict certain processing. You may also
            control cookies through your browser and advertising preferences
            through available provider settings. To make a privacy request,
            contact us using the details below. We may need to verify your
            request and may be unable to fulfill requests where an exception
            applies.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Children&apos;s privacy</h2>
          <p className={paragraphClass}>
            CompilePilot is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13. If
            you believe a child has provided us personal information, please
            contact us so we can take appropriate steps.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Third-party websites and blog</h2>
          <p className={paragraphClass}>
            The website may link to third-party websites, services, or
            resources, including websites referenced in blog articles. We do
            not control their privacy practices. Review the privacy policy of
            any third-party service before providing information to it.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>11. Changes to this policy</h2>
          <p className={paragraphClass}>
            We may update this policy as the website, tools, or applicable
            requirements change. The updated version will be posted on this
            page with a revised “Last updated” date. Please review it
            periodically.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>12. Contact us</h2>
          <p className={paragraphClass}>
            For questions or privacy requests, email{" "}
            <a
              className="font-medium text-orange-700 underline underline-offset-2"
              href="mailto:deepakcontact626@gmail.com"
            >
              deepakcontact626@gmail.com
            </a>{" "}
            or visit our{" "}
            <Link
              className="font-medium text-orange-700 underline underline-offset-2"
              href="/contact"
            >
              contact page
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
