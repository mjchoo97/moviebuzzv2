import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-10 px-4 md:px-20 lg:px-40">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-neutral-100 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-sm text-neutral-400 mb-2">
          Effective Date: [30th September 2024]
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Introduction
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            Welcome to <strong>MovieBuzz</strong>. We value your privacy and are
            committed to protecting your personal data. This privacy policy
            explains how we collect, use, and protect your information when you
            use our website,{" "}
            <a
              href="http://moviebuzz.com"
              className="text-blue-500 hover:underline"
            >
              moviebuzz.com
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Information We Collect
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            We may collect the following personal information from you:
          </p>
          <ul className="list-disc pl-6 text-neutral-400 mt-2">
            <li>
              <strong>Email Address:</strong> For account registration and
              communication purposes.
            </li>
            <li>
              <strong>First Name:</strong> To personalize your experience and
              for communication.
            </li>
            <li>
              <strong>Last Name:</strong> To personalize your experience and for
              communication.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            The personal information collected is used in the following ways:
          </p>
          <ul className="list-disc pl-6 text-neutral-400 mt-2">
            <li>To provide and improve our services.</li>
            <li>
              To send you updates, newsletters, and promotional content (if you
              have opted in).
            </li>
            <li>
              To respond to inquiries, support requests, and provide customer
              service.
            </li>
            <li>To personalize your experience on MovieBuzz.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Sharing of Personal Information
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties unless we provide users with advance
            notice. This does not include website hosting partners and other
            parties who assist us in operating our website, conducting our
            business, or serving our users, so long as those parties agree to
            keep this information confidential.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            We may use cookies and similar tracking technologies to enhance your
            experience on our site. You can choose to disable cookies through
            your browser settings, but some features of the website may not
            function properly without them.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Data Security
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            We implement a variety of security measures to maintain the safety
            of your personal information. However, no electronic transmission
            over the Internet or information storage technology can be
            guaranteed to be 100% secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Your Rights
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-neutral-400 mt-2">
            <li>Access and update your personal information.</li>
            <li>Request deletion of your personal data.</li>
            <li>
              Object to the processing of your data in certain situations.
            </li>
          </ul>
          <p className="text-neutral-400 leading-relaxed mt-4">
            If you wish to exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:moviebuzz@gmail.com"
              className="text-blue-500 hover:underline"
            >
              moviebuzz@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Contact Information
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            If you have any questions, concerns, or inquiries regarding this
            privacy policy, please contact us at:
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

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            We reserve the right to update this privacy policy at any time. Any
            changes will be posted on this page, and the updated policy will be
            effective immediately upon posting.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
