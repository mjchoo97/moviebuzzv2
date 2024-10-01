import React from "react";

const TermsOfService = () => {
  return (
    <div className=" min-h-screen py-10 px-4 md:px-20 lg:px-40">
      <div className="max-w-4xl mx-auto  shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-neutral-100 mb-6 text-center">
          Terms of Service
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            By accessing and using the website **MovieBuzz (moviebuzz.com)**,
            you accept and agree to be bound by the terms and provisions of this
            agreement. In addition, when using MovieBuzz&apos;s services, you
            shall be subject to any posted guidelines or rules applicable to
            such services, which may be posted and modified from time to time.
            All such guidelines or rules are hereby incorporated by reference
            into the Terms of Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            2. Modification of Terms
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            MovieBuzz reserves the right, at its sole discretion, to change or
            modify portions of these Terms of Service at any time. If we make
            changes, we will notify you by revising the date at the top of these
            terms. Your continued use of the site after any such changes
            constitutes your acceptance of the new Terms of Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            3. User Responsibilities
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            By using this site, you agree not to engage in any of the following
            activities:
          </p>
          <ul className="list-disc pl-6 text-neutral-400 mt-2">
            <li>
              Uploading, posting, or transmitting any content that infringes the
              intellectual property rights of others.
            </li>
            <li>
              Using the website to conduct or promote any illegal activities.
            </li>
            <li>
              Attempting to gain unauthorized access to other computer systems
              through the website.
            </li>
            <li>
              Interfering with the use and enjoyment of the site by other users.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            4. Intellectual Property Rights
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            The content on MovieBuzz, including but not limited to text,
            graphics, logos, and images, is the property of MovieBuzz or its
            content suppliers and is protected by copyright, trademark, and
            other intellectual property laws. You agree not to reproduce,
            duplicate, copy, sell, resell, or exploit any portion of the service
            without the express written permission of MovieBuzz.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            5. Third-Party Links
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            MovieBuzz may contain links to third-party websites or services that
            are not owned or controlled by MovieBuzz. We have no control over
            and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites. You further acknowledge and
            agree that MovieBuzz shall not be responsible or liable, directly or
            indirectly, for any damage or loss caused or alleged to be caused by
            or in connection with use of any such content or services available
            through any third-party sites.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            6. Termination
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            MovieBuzz reserves the right to terminate or suspend your access to
            the site, without prior notice or liability, for any reason
            whatsoever, including but not limited to if you breach the Terms of
            Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            7. Disclaimer of Warranties
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            The website is provided on an &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; basis. MovieBuzz makes no representations or
            warranties of any kind, express or implied, as to the operation of
            the site or the information, content, or materials included on this
            site. You expressly agree that your use of this site is at your sole
            risk.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            In no event shall MovieBuzz or its affiliates, partners, directors,
            or employees be liable for any indirect, incidental, special, or
            consequential damages arising out of or in connection with the use
            of or inability to use the website or services provided, even if
            MovieBuzz has been advised of the possibility of such damages.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            9. Contact Information
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <ul className="list-disc pl-6 text-neutral-400 mt-2">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:moviebuzz@gmail.com"
                className="text-blue-500 hover:underline"
              >
                moviebuzz@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
