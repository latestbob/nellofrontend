import * as React from "react";
import { Link } from "react-router-dom";
import "./index.css";
export default function Browse() {
  return (
    <>
      <section className="bg-sky-light">
        <div className="container section">
          <div className="product-hero appPadding" style={{ height: "270px" }}>
            <h2> TERMS AND CONDITIONS</h2>
            <p>
              {/* PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE <br />
          USING OUR MOBILE DEVICE SERVICE AND RELATED WEBSITE. */}
            </p>
          </div>

          <div id="ermsBody" className=" appPadding">
            <h2 className="ermsBodyH2">
              PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE
              USING OUR MOBILE DEVICE SERVICE AND RELATED WEBSITE.
            </h2>
            <p>
              These Terms of Use is a legally binding agreement between Ask
              Nello Enterprises, a Nigerian Business Enterprise with its
              principal offices in Lagos, Nigeria (referenced as “we”, “our” or
              “us”), and you, (referenced as “you” or “your”) the user of
              Nello’s mobile device Service (the “App”) and related website at
              www.asknello.com, including the mobile-optimized versions of such
              website (the “Site”) (collectively the “Nello Platform”). By
              accessing the Nello Platform and/or by using the Services
              (hereinafter defined) and/or by clicking the “I Agree” button, you
              unconditionally agree to abide by and be bound by this Agreement
              and our Privacy Policy. If you do not agree to be bound by and
              comply with all of the terms of this Agreement, please do not use
              the Services. We may update the terms from time to time, and will
              always notify you of such updates. If you do not agree to, or
              cannot comply with, the terms as amended, you should not use the
              Nello Platform. You will be deemed to have accepted these terms as
              amended if you continue to use the Nello Platform after any
              amendments are made. If you have any questions or ideas, or if you
              need to provide notice to us, don’t hesitate to contact us at
              info@asknello.com.
            </p>

            <h2 className="ermsBodyH2">ABOUT OUR SERVICES</h2>
            <p>
              Nello is an integrative healthcare platform that aggregates health
              data of customers and provide personalized healthcare information,
              serving as a personal healthcare assistant via the Nello Platform.
              The services provided via the Nello Platform (the “Services”)
              include:
              <br />
              - access to clinical consultation services (“Clinical Services”)
              provided by Practitioners which comprise:
              <br /> general clinical consultations
              <br /> fertility consultations
              <br /> therapy consultations
              <br /> pharmaceutical services - access to pharmaceutical and
              health products <br />
              - artificial intelligence symptom checker to receive healthcare
              and triage information.
              <br />
              - information services, through digital healthcare tools, that
              provide health and lifestyle information
              <br />
              - access to medical history
              <br />
              - booking consultation appointments (both online and offline)
              <br />
              You hereby acknowledge that Nello does not provide health care
              services, or function as a healthcare services provider, hospital,
              clinic or dispensary. All such services are provided by
              independent medical/health practitioners, who are not employed by
              Nello or any of its affiliates.
              <br />
              Nello shall however ensure that:
              <br />
              the Practitioners are duly qualified & accredited to provide
              healthcare services. the Practitioners, in providing healthcare
              services, adopt best practices, and comply with all applicable
              laws & regulations. The user shall be at liberty to request for
              the credentials of a Practitioner, and same shall be supplied upon
              request. Some medical conditions are not suitable for remote
              consultations. You should always seek advice from a medical
              practitioner in person if you are unsure about whether you have
              been able to explain or communicate your medical needs to our
              Practitioners, or if you have any concerns about the advice you
              receive from the Practitioners, or if it is different from other
              advice you have received. All services are currently only provided
              in English. You should not use our services in an emergency, or if
              you have a condition that you know will require a physical
              examination. If you think you have a medical emergency, you should
              call your doctor or visit your closest hospital or health center
              immediately. Our services provide healthcare information, and
              should not be considered as a substitute for medical advice,
              diagnosis and/or treatment. They provide information to you based
              on information entered. They do not diagnose your own health
              condition or make treatment recommendations for you. You should
              not take or stop taking any action (such as taking medicines)
              based on information from our information services, and we make no
              warranties in relation to same. The Clinical Services provided via
              the Nello Platform are provided by appropriately qualified, and
              experienced staff and Practitioners registered with the Nigerian
              Medical Association (NMA). If you think that the services you
              received have not met this standard, please contact us as soon as
              possible and we will use our best endeavours to resolve your
              complaints. The Practitioners will not prescribe medicines unless
              it is, in their judgement, in their patient's best interests. By
              completing and submitting the Nello questionnaire, the
              Practitioner provides a report based on the information provided
              by you (“Report”). Neither the Report, nor other outputs from the
              questionnaire constitute medical advice, diagnosis or acts as a
              substitute for a doctor. Reports are personalised to you, as they
              are generated solely on the basis of information you enter and
              general information and risk factors.
            </p>

            <h2 className="ermsBodyH2">OUR PARTNERS</h2>
            <p>
              In certain instances, Nello may collaborate with any of the
              following independent third parties in the provision of the
              Services which shall include but not limited to:
              <br />
              - Health Maintenance Organisations (HMOs) to provide health
              insurance services to the users.
              <br />
              - Pharmacies for the dispensing of drugs and medicines recommended
              by the Practitioners
              <br />
              - Medical Laboratories for pathology and diagnostic services
              <br />
              - Dieticians
              <br />
              - Telehealth service providers
              <br />
              - electronic medical record system providers
              <br />
              <br />
              Our Partners are independent contractors and as such are not staff
              of Nello. Nello shall however, ensure that they are duly licensed
              to provide the services, as applicable. You acknowledge that Nello
              shall not be responsible or liable for any loss, claim or damages
              arising from your purchase of such third party health
              services/products, and Nello does not control the services or
              content accessed in connection with such third parties. Where you
              decide to utilize any of the collaborated services, you agree to
              strictly follow the instructions and terms of usage of such
              services, and Nello will not be liable for any loss that may occur
              from any failure to abide by the said terms. You hereby agree that
              the use of discount and/or promotional codes with any third party
              partner is in agreement with Nello’s terms and conditions, as
              applicable. You agree that Nello will not be liable for any loss
              that may arise from your failure to follow the necessary
              instructions or terms. You also agree that referrals cannot be
              redeemed for cash.
            </p>

            <h2 className="ermsBodyH2">INTENDED USERS</h2>
            <p>
              The Service is available only to users who are at least 18
              (eighteen) years old, or at least 16 (sixteen) years old with the
              consent of a parent or legal guardian. The Service may be used by
              children under 16 (sixteen) years of age in accordance with
              Paragraph 11.1. If you are using the Service for the benefit of a
              child, please do not provide information relating to such child
              unless you have obtained the child’s parents’ or guardians’
              consent, including their consent to our Privacy Policy. If you
              discover that your child has been using the Service without your
              consent, or that someone has been using the Service for or on
              behalf of your child without your consent, please contact us
              immediately at info@asknello.com, and we will take reasonable
              steps to delete the child’s information from our active databases.
              By accessing and using the Services, you agree as follows:
              <br />
              a. You hereby CONSENT to the processing of your information in the
              manner as provided in our Privacy Policy.
              <br />
              b. Any and all registration information you submit is truthful and
              accurate, & you will maintain the accuracy of such information.
              <br />
              c. Your use of the Service will not violate any applicable law,
              regulation, order or guideline.
              <br />
              d. You consent to receiving messages and promotional material
              offering in-Service purchases.
              <br />
            </p>

            <h2 className="ermsBodyH2">DISCLAIMER</h2>
            <p>
              Your use of any aspect of the Service is at your sole discretion.
              You must consult with healthcare providers and make your medical
              decisions based on their advice.
              <br />
              If you use and/or access the Service on or from an Android device
              which you or someone else rooted or on or from an iOS device which
              you or someone else jail broke, Nello shall not be responsible for
              the security of your data, including your personal information,
              and you shall bear all responsibility for any breach, illegal
              access, loss and/or corruption of such data.
              <br />
              Nello is not liable for consultations given by the Practitioners -
              all opinions and diagnoses are strictly that of the Practitioners.
              However, in the event of negligence by a Practitioner Nello
              undertakes to take appropriate steps including reporting such
              Practitioner to the applicable regulatory body for sanctions.
              <br />
              NELLO MAKES NO REPRESENTATIONS OR WARRANTIES WHATSOEVER IN RESPECT
              OF THE SERVICE. INFORMATION REGARDING MEDICATIONS, HEALTH, MEDICAL
              ADVICE AND OTHERWISE MAY BE PROVIDED BY THIRD PARTIES, INCLUDING
              OTHER USERS OF THE SERVICE. WE CANNOT ACCEPT ANY LIABILITY
              WHATSOEVER IN RESPECT OF ANY SUCH CONTENT WHICH IS PROVIDED BY
              THIRD PARTIES AND/OR ANY OTHER USERS OF THE SERVICE. ANY ACTIONS
              YOU TAKE BASED ON CONTENT, NOTIFICATIONS AND OTHERWISE PROVIDED ON
              THE NELLO PLATFORM ARE TAKEN AT YOUR SOLE RISK. YOU SHOULD ALWAYS
              CHECK ANY INFORMATION PROVIDED THROUGH THE SERVICE TO ENSURE ITS
              ACCURACY.
              <br />
              To the extent permitted by law, Nello will not bear any liability
              for any direct, indirect or consequential loss, harm or damage
              whatever arising out of or associated with the use of the Services
              provided by independent third parties on or via the Nello
              Platform.
            </p>

            <h2 className="ermsBodyH2">USER RESPONSIBILITY</h2>
            <p>
              If you submit any information to us through or related to the
              Service or send us any business information, feedback, idea,
              concept or invention to us by e-mail, you shall ensure that you
              have all necessary permission to submit or otherwise make
              available such information. You further agree that:
              <br />
              a. you will not reproduce, duplicate, copy, sell, resell, or
              exploit the Service, its Content, its software or any portion of
              any of the foregoing.
              <br />
              b. you will not use the Service for any purpose in violation of
              local, state, national or international laws.
              <br />
              c. you will not solicit another user’s password or personal
              information under false pretenses.
              <br />
              d. you will not impersonate another person or entity or otherwise
              misrepresent your affiliation with a person or entity, and/or use
              or access another user’s account or password without permission.
              e. you will not violate the legal rights of other users, by
              defaming, abusing, stalking or threatening other users;
              <br />
              f. you will not infringe the intellectual property rights, privacy
              rights, or moral rights of any third party;
              <br />
              g. you will not post or transmit any Content that is (or you
              reasonably believe or should reasonably believe to be) illegal,
              fraudulent, or unauthorized; or further such activity, or that
              involves (or you reasonably believe or should reasonably believe
              to involve) any stolen, illegal, counterfeit, fraudulent, pirated,
              or unauthorized material.
              <br />
              h. you will not publish falsehoods or misrepresentations,
              including with respect to any medical or health information.
              <br />
              i. you will not post or transmit any Content that is (or
              reasonably should be understood to be) libelous, defamatory,
              obscene, offensive (including material promoting or glorifying
              hate, violence, or bigotry or otherwise inappropriate to the
              community ethos of the Service).
              <br />
              j. you shall not collect or mine data relating to other users of
              the Service.
              <br />
              k. you shall not interfere or attempt to interfere with the proper
              working of the Service or otherwise disrupt the operations or
              violate the security of the Service. Violations of system or
              network operation or security may result in civil or criminal
              liability.
              <br />
              You agree to comply with all user responsibilities and obligations
              as stated in this Agreement. We will investigate possible
              occurrences of any violations, and we may involve the law
              enforcement authorities in prosecuting anyone involved with such
              violations.
              <br />
              Non-enforcement of any of the above terms, or our failure to act
              with respect to a breach by you does not constitute consent or
              waiver, and we reserve the right to enforce such term at our sole
              discretion. No waiver of any breach or default hereunder shall be
              deemed to be a waiver of any preceding or subsequent breach or
              default. Nothing contained in this Agreement shall be construed to
              limit the actions or remedies available to us with respect to any
              prohibited activity or conduct.
              <br />
              We will upon investigation of suspected violations of these terms
              or illegal and inappropriate behavior relating to the use of the
              Service, notify and fully cooperate with any law enforcement
              investigation or court order ordering us or directing us to
              disclose the identity, behavior or activities of anyone believed
              to have violated these terms or to have engaged in illegal
              behavior.
              <br />
            </p>

            <h2 className="ermsBodyH2">LICENSE GRANT</h2>
            <p>
              We hereby grant to you a limited, non-exclusive, non-assignable,
              non-sublicensable license to access and use the Services, and any
              user guides, specifications or related documentation (the
              “Documentation”), subject to the terms and conditions of this
              Agreement. Asides the modes of gaining licence to access the
              Service as provided on the Site, other alternative modes of
              gaining access may be made available through a Mobile Application,
              tokens or vouchers which would be resold by authorized third
              parties. This grant of license is only for your personal and
              non-commercial use and subject to the terms of this Agreement. To
              the extent not limited or restricted under any applicable law or
              regulation, you are granted permission to temporarily download one
              copy of the App solely for personal, non-commercial use on each
              mobile device that you own or control. You may not distribute or
              make the App available for use by others on multiple devices
              simultaneously. Under this license, except as and only to the
              extent any of the following restrictions are prohibited by
              applicable law or any of the restricted activities are permitted
              by the licensing terms of any open-sourced components incorporated
              into the App, you may not:
              <br />
              a. lend, rent, lease, sell, redistribute, assign, sublicense or
              otherwise transfer the App or the right to download or use the
              App.
              <br />
              b. use the Services for any commercial purpose or for any
              commercial or non-commercial public display.
              <br />
              c. copy, decompile, reverse engineer, disassemble, attempt to
              derive the source code of the App, any App updates, or any part of
              the App or updates, or attempt to do any of the foregoing.
              <br />
              d. copy, modify or create derivative works of the Services,
              Documentation, updates or any part of the Services, Documentation
              or updates.
              <br />
              e. remove any copyright or other proprietary notices from the App,
              Documentation, or the Site.
              <br />
              f. transfer the Content or materials from the App or Site to
              anyone else or “mirror” the same on any server.
              <br />
              g. circumvent, disable, or otherwise interfere with
              security-related features of the Service.
              <br />
              h. use any robot, spider, site search or retrieval Service; or any
              other manual or automatic device or process to retrieve, index,
              data-mine, or in any way reproduce or circumvent the navigational
              structure or presentation of the Service.
              <br />
              i. harvest, collect or mine information about other users of the
              Service.
              <br />
              j. post or transmit any virus, worm Trojan horse or other harmful
              or disruptive element.
              <br />
              k. violate any applicable law, rule or regulation in using the
              Services.
              <br />
              i. use any logo or other proprietary graphic or trademark of ours,
              our partners or affiliates without our express written permission.
              <br />
              In the event of a violation of any of these restrictions (as
              determined by us), the license granted hereunder will be
              automatically revoked, and you may be liable to prosecution and
              damages.
              <br />
            </p>

            <h2 className="ermsBodyH2">
              THIRD PARTY SITES & OPEN-SOURCE SOFTWARE
            </h2>
            <p>
              The Platform may contain links to other independent third-party
              websites (“Third party Sites”). Third party Sites are not under
              our control, and we are not responsible for and do not endorse
              their content. You will need to make your own independent
              judgement regarding your interaction with any Third-party Sites,
              including the purchase and use of any products or services
              accessible through them, or disclosure of personal information. To
              this end, we encourage you to read the privacy policies of Third
              party Sites before using or accessing same. If any open-source
              software is included in the App, the terms of an open-source
              licence may override some of the terms set out in this section.
            </p>

            <h2 className="ermsBodyH2">
              {" "}
              REQUIREMENTS FOR THE PROVISION OF SERVICES
            </h2>
            <p>
              We can only provide you with services in accordance with these
              terms if you provide us with the information we need in order to
              help you. Accordingly, you must ensure that:
              <br />
              a. any information you give to us or a Practitioner, or enter into
              the App is accurate and in English.
              <br />
              b. if you have any concerns about the information we provide you
              or any information in the App or the Websites, you seek further
              medical advice.
              <br />
              c. you follow any instructions you are given by Practitioners.
              <br />
              d. you follow any instructions regarding the use of any medicines
              or healthcare products recommended or prescribed by the
              Practitioners (including in respect of use-by dates).
              <br />
              e. you report any adverse or unexpected effects of treatments
              recommended by a Practitioner.
              <br />
              f. you keep any medicines given to you securely and do not allow
              others (especially children) to use them or have access to them.
              <br />
              g. you promptly notify us if any information about you on our
              database is or becomes inaccurate or incomplete.
              <br />
              h. you use our services only for yourself, unless you are helping
              a child.
              <br />
              An accurate record of your use of the Services is required to
              efficiently provide the Services. Accordingly, please do not
              register more than once for the Services.
              <br />
            </p>

            <h2 className="ermsBodyH2">
              TECHNICAL REQUIREMENTS FOR USING THE APP
            </h2>
            <p>
              Upon development of the App below are the technical requirements
              that should be readily available:
              <br />
              i. The App shall include softwares provided by people other than
              the Company, and should use certain data that you provide to it in
              order to work.
              <br />
              ii. The App shall operate only on iPhone version 4S or higher
              running iOS 10 or higher, or Android-enabled phones running
              Android v4.3 or higher. It will require a consistent 3G, 4G or
              faster data connection and does not operate reliably on GPRS or
              EDGE connections.
              <br />
              iii. We recommend that if you are using a wireless network to
              access the App, you avoid use of public wi-fi facilities in favour
              of a personal wi-fi connection, and that the wireless network is
              secured with WPA-2 security. We recommend that the device from
              which you access the App is password protected, set to lock after
              a short period of inactivity, and protected with suitable anti-
              virus and anti-malware software.
              <br />
              From time to time, updates to the App may be made available to
              you. We recommend that you use the latest version of the App at
              all times, to take advantage of the latest enhancements. Depending
              on the update, you may not be able to use the Services until you
              have downloaded or streamed the latest version of the App and
              accepted any new terms.
              <br />
              While we will take adequate measures to ensure the optimal
              performance of the Services on the Platform, we do not warrant or
              guarantee that the Service will function with your mobile or
              computing device or be compatible with the hardware or software on
              any particular devices. Information will be transmitted over a
              medium that is beyond our control; multiple factors, including
              network availability, may affect alert or notification delivery or
              otherwise interfere with the operation of the Service. Without
              limiting the foregoing, we, and our licensors make no
              representations or warranties about the availability, accuracy,
              reliability, completeness, quality, performance, suitability or
              timeliness of the Service or Content, including software, text,
              graphics, links, or communications provided on or through the use
              of the Service. Although we take reasonable measures to keep the
              Service free of viruses, worms, Trojan horses or other code that
              contain destructive properties, we do not warrant or guarantee
              that files available for downloading through the Service will be
              free of such contaminations.
              <br />
            </p>

            <h2 className="ermsBodyH2">REGULATION OF THE SERVICES</h2>
            <p>
              If you are accessing the Services from outside Nigeria, you should
              check whether it is lawful to access our services in the territory
              where you are. We provide our services in compliance with Nigerian
              laws and regulations, and cannot take responsibility for any
              differences between these rules and any different rules applying
              to healthcare services in other jurisdictions.
            </p>

            <h2 className="ermsBodyH2">CHILDREN AND OUR SERVICES</h2>
            <p>
              Adults can use our services on behalf of children, but children
              shouldn't use our services themselves. Children under 16 (sixteen)
              years old may have an account opened for them by a parent or legal
              guardian, and such parent or legal guardian shall supervise the
              child’s use of our services at all times. Young people between 16
              (sixteen) and 18 (eighteen) years may use our services and open
              their own account with us, only if an adult has agreed to use of
              their credit or debit card for the payment of charges. We may
              suspend services or terminate a user account if we reasonably
              suspect that it is being used in breach of the restrictions
              contained in this paragraph.
            </p>

            <h2 className="ermsBodyH2">DISCOUNTS/ PROMOTIONAL CODES</h2>
            <p>
              Nello may collaborate with third parties to provide free or
              discounted plans for users. Where a discount is provided for the
              Service, the user shall be responsible for paying the difference
              in order to access the Service. Discounts/ promotional codes
              (“Codes”) shall be valid for a specified period (“Validity
              Period”), which shall be communicated to the user. Where the user
              fails to cancel the subscription at the end of the Validity
              Period, the user shall be charged a renewal fee for the
              subscription. You hereby agree that the Codes: a. may not be
              duplicated, sold or transferred in any manner, or made available
              to the general public, unless expressly permitted by Nello and
              <br />
              b. may only be used in accordance with such terms as may be
              specified by us.
              <br />
              Nello reserves the right to withhold or deduct credits or other
              features or benefits obtained through the use of a Code by a user
              in the event that we determine or believe that the use or
              redemption of the Code was in error, fraudulent, illegal, or in
              violation of the applicable terms or these Terms.
            </p>

            <h2 className="ermsBodyH2">EXPORT RESTRICTION</h2>
            <p>
              Except as authorized by Nigerian law and the laws of the
              jurisdiction in which the Service was obtained or is used, you may
              not use, export or re-export the Service. Specifically, and
              without limiting the foregoing, the Service may not be exported or
              re-exported into any Nigerian or international embargoed countries
              or to anyone on an internationally Denied Person’s List or Entity
              List or Specially Designated Nationals. You represent and warrant
              that you are not on any such list or located in any such country
              and that you will not use the Service for any purposes prohibited
              by Nigerian or other applicable law.
            </p>

            <h2 className="ermsBodyH2">
              {" "}
              LIMITATIONS AND/OR RESTRICTIONS REGARDING THE SERVICES
            </h2>
            <p>
              We do not guarantee the availability of any particular
              Practitioner at any particular time. We will do what we can to
              arrange a consultation with a Practitioner as soon as possible,
              but do not guarantee to offer consultations within a particular
              time. Consultations will be according to the standard durations
              offered by the particular practitioner. These terms will be
              updated to reflect the duration for remote consultations when the
              service is made available. Other than for Clinical Services, if
              you choose to submit details about your symptoms in the App, the
              information returned is on the basis of general healthcare
              information and not as personalised health advice for you. Where
              the information returned indicates that the symptoms entered
              necessitate further medical advice, you acknowledge that you are
              responsible for seeking such advice from your doctor or other
              medical professional. Practitioners may hold different clinical
              opinions on the same medical condition or symptoms and, provided
              these opinions are reasonably held, the fact that two or more
              Practitioners give different opinions in the course of service
              provision does not necessarily indicate that the Services are
              defective. We do not tolerate abuse or offensive behaviour towards
              Practitioners. The Services are designed to be accessed remotely
              by any of our customers, but are not designed for non-English
              speakers. Certain personal information may be requested of you to
              effectively provide the Services. If you do not provide this
              information when requested, you may be unable to take benefit of
              the Services. While certain information controlled, generated by,
              displayed within or stored in the App may be helpful in providing
              warning of certain medical or health conditions or circumstances,
              the App is not designed as, nor may you use it as, a device to
              detect, diagnose, treat or monitor any medical or health condition
              or to establish the existence or absence of any medical or health
              condition. We may suspend your access to services or terminate
              your account with us if your use of services breaches any of these
              terms. In the event that the provision of the Services is
              interrupted by events outside our control, we will use our best
              endeavours to notify you as soon as we can and take the steps that
              we reasonably can to minimise the interruption to our services. We
              shall however not bear any liability in this regard.
            </p>

            <h2 className="ermsBodyH2">ACCESSING OUR SERVICES</h2>
            <p>
              Our services are accessible using the internet, data networks and
              devices which can access the internet (“Infrastructure”) and
              operate the App and our Websites. We make the App and our Websites
              available for access using the Infrastructure, but are not
              responsible for such Infrastructure ourselves. If you wish to use
              the services, you should ensure you have an internet- enabled
              device and a sufficient internet connection available. Technical
              or security threats or issues affecting the Nello Platform may
              require us to suspend our services in order to ensure they are
              secure and/or operating optimally. We will minimise these
              suspensions. When you use the App or send e-mails to us, you are
              communicating with us electronically. We will communicate with you
              by e-mail or by posting notices, alerts, prompts, information
              fields or other information through the App as is necessary to
              deliver the services to you. We operate anti-virus and malicious
              software prevention measures on the Websites and our App, but we
              cannot guarantee that our services will always be virus-free. You
              should ensure that your devices used to access services are
              protected against viruses and malicious software. You must not use
              or expose the App or the Websites to virus or malicious software
              contamination. You must not attempt to gain unauthorised access to
              the services, App or Websites. Installation of the App on a device
              that has had its operating system compromised by the process of
              Jailbreaking (Apple iOS) or Rooting (Android) is not permitted and
              may result in the security of your personal data being
              compromised. The App has not been developed to meet your
              individual requirements. It is therefore your responsibility to
              ensure that the facilities and functions of the App meet your
              requirements.
            </p>

            <h2 className="ermsBodyH2">YOUR PERSONAL INFORMATION</h2>
            <p>
              Your consultations via the app are recorded. Details of how we
              protect and use such recordings are set out in our Privacy Policy.
              We use your personal information in accordance with our Privacy
              Policy. Please take the time to read it as it includes important
              details about how we secure and process your data.
            </p>

            <h2 className="ermsBodyH2">PRICING AND PAYMENT</h2>
            <p>
              The price of our services (“Charges”) will be set out in the App
              or on the website at the time of our commitment to provide
              services. Our prices may change at any time, but price changes
              will not affect any services that you have already ordered. You
              will be responsible for paying the Charges, where applicable,
              unless otherwise stated. We will usually charge or invoice you for
              services at the time you order them. Any amounts charged or
              invoiced are due and payable upon our invoice being issued unless
              otherwise specified in these terms or the App. You can pay for
              services using a credit or debit card. Payment may also be by bank
              transfer, using the details as advised by us on the App. Where
              payment is made by bank transfer, access to the services will only
              be granted upon confirmation by us of receipt the payment. Except
              otherwise stipulated herein or agreed, any Charges paid shall not
              be refunded. Notwithstanding, we will refund any excess payments
              made for the Services within seven [7] to fourteen [14] days from
              the date of receipt of your notice to us for such payments.
              Transaction charges will not be refunded.
            </p>

            <h2 className="ermsBodyH2">OUR LIABILITY TO YOU</h2>
            <p>
              If we breach any of these terms and you suffer loss or damage, we
              are responsible for compensating you for that loss or damage if it
              was a foreseeable result of our breaching of these terms. We are
              not responsible for compensating you for loss or damage that is
              not a foreseeable result of breaching these terms. We will also
              not be liable for indirect, incidental, special or consequential
              damages. Other than the Clinical Services, our software and
              services are provided on an ‘as is’ basis without a warranty of
              any kind being provided by us. In all cases of liability, we will
              not be liable to you for an amount greater than the fees paid to
              us by you. If we provide digital content that is defective and
              damages a device or other digital content belonging to you, and we
              have not employed reasonable skill and care, we will compensate
              you or repair the device or content (at our election). We will not
              be liable for any loss or damage resulting from defective digital
              content where you have failed to follow our usage instructions or
              advice in these terms. We supply our services for personal use and
              we are not responsible for any losses you suffer arising out of
              the unauthorised use of the services. The Platform is designed to
              keep your personal health data secure and it is important that you
              follow the usage instructions and advice in these terms in order
              to keep your data safe. We are not liable for loss or unauthorised
              access to your data which is occasioned by your negligence.
            </p>

            <h2 className="ermsBodyH2">INTELLECTUAL PROPERTY</h2>
            <p>
              We own copyright and other intellectual property rights in the
              App, Documentation, Websites, the Services (as applicable) and
              their content (“NELLO IPR”). You are permitted to use NELLO IPR as
              may be required in order to receive the Services, store it on your
              device and print copies of it for your personal use. You may also
              transmit material containing NELLO IPR to your doctor or another
              medical practitioner. You are not permitted to copy, distribute,
              further develop, reproduce, re-publish, modify, alter, download,
              post, broadcast, transmit or make any business use of NELLO IPR.
              You must not remove, alter or conceal or obscure any copyright,
              trademark, service mark or other proprietary notices regarding
              NELLO IPR.
              <br />
              The NELLO mark, logo, combined mark and logo and other marks
              indicated in our App are our trademarks. Other graphics, logos,
              page headers, button icons, scripts, and service names are
              trademarks of other businesses or our affiliates or partners.
            </p>

            <h2 className="ermsBodyH2">CANCELLATIONS</h2>
            <p>
              I have read all the terms and conditions within this Notice and
              For our subscription services, generally, there is no minimum
              subscription period and you can cancel your subscription with us
              at any time without additional charge. In such case, your
              cancellation will take effect at the end of the period you have
              paid for and no further payment will be taken. Where you cancel
              your subscription, you shall not be entitled to a refund of the
              subscription fee paid. In the event of cancellation of a
              specialist appointment, you will only be allowed to reschedule the
              appointment. If you want to cancel your agreement under this
              section, kindly notify us by emailing us at info@asknello.com.
            </p>

            <h2 className="ermsBodyH2">CUSTOMER SUPPORT</h2>
            <p>
              You may utilise the offline service feature on the Nello Platform
              which ensures your continued access to licensed medical
              practitioners in the event of a network failure. All complaints
              and support required in the provision of the Services may be
              communicated via the following channels:
              <br />
              a. In-app reporting feature on the Nello Platform
              <br />
              b. Customer care line: [09070041292]
              <br />
              Email: [hello@asknello.com]
              <br />
              We shall use our best efforts to promptly respond to and/or
              address requests and complaints made in relation to the Services.
            </p>

            <h2 className="ermsBodyH2">COMPLAINTS AND DISPUTES</h2>
            <p>
              If you have a complaint about the Services, we would like to
              resolve it as soon as possible. Please tell us about your
              complaint as soon as you can so that we can do this. If you wish
              to make a formal complaint about our services, you should do so as
              soon as possible by contacting us via any of the channels provided
              above. We may ask you for certain details about you and your
              complaint in order to address it. Please provide these as soon as
              you can so that we can resolve your complaint quickly. Where your
              complaints involve our onboarded Practitioners, your complaints
              would be handled and investigated in accordance with the
              professional rules applicable to our Practitioners and in respect
              of the Services. We will also communicate to you the outcome of
              our investigation into your complaint and give you the chance to
              discuss same with us. If we are unable to resolve a disagreement
              amicably, either of us can refer the dispute to the Lagos
              Multi-Door Courthouse (LMDC) for mediation, which shall be
              conducted in accordance with the LMDC Mediation Procedure Rules or
              such other rules mutually agreed rules.). If for any reason, the
              dispute is not resolved by mediation, either of us may refer the
              dispute to arbitration, in accordance with the provisions of the
              Arbitration and Conciliation Act Cap A18, Laws of the Federation
              of Nigeria 2004. The venue of the arbitration shall be Lagos
              State. Neither party shall be precluded from seeking any
              injunctive reliefs in the courts of law. These terms are governed
              by Nigerian law and the Nigerian courts shall have exclusive
              jurisdiction to hear any claim arising out of or in connection
              with these terms or the use of the Services.
            </p>

            <h2 className="ermsBodyH2">OTHER IMPORTANT TERMS</h2>
            <p>
              If there is any proposed transfer of our rights and obligations
              under these terms, we will always notify you in writing and this
              will not affect your rights under these terms. As the Services
              provided via the Platform are personalised, you may only transfer
              your rights or your obligations under these terms to another
              person with our written consent. The agreement for the provision
              of the Services is between you and us. Accordingly, only you can
              enforce that agreement (although a parent or guardian may enforce
              same on behalf of a person under 18 whose use of our services is
              allowed in accordance with these terms).
            </p>

            <h2 className="ermsBodyH2">EXPORT RESTRICTION</h2>
            <p>
              Except as authorized by Nigerian law and the laws of the
              jurisdiction in which the Service was obtained or is used, you may
              not use, export or re-export the Service. Specifically, and
              without limiting the foregoing, the Service may not be exported or
              re-exported into any Nigerian or international embargoed countries
              or to anyone on an internationally Denied Person’s List or Entity
              List or Specially Designated Nationals. You represent and warrant
              that you are not on any such list or located in any of such
              country and that you will not use the Service for any purposes
              prohibited by Nigerian or other applicable law.
            </p>

            <h2 className="ermsBodyH2">TERMINATION</h2>
            <p>
              This Agreement is effective until terminated by either you or us.
              You may request termination of your account at any time by sending
              an e-mail to info@asknello.com, provided that you shall be
              required to discontinue any further use of the Service. If you
              violate this Agreement, any permission and/or license(s) granted
              hereunder for the use of the Service, shall be automatically
              terminated. We may, in our sole discretion, terminate this
              Agreement and your access to any or all of the Service, at any
              time and for any reason. Where this Agreement is terminated
              without cause by us, and you have a subsisting subscription, we
              will refund the proportion of the Charges you have already paid.
              Where this Agreement is terminated as a result of your breach of
              this Agreement, no refund of any paid amount shall be refundable.
              This action shall be in addition to and not in lieu or limitation
              of any other right or remedy that may be available to us. Upon any
              termination of the Agreement by either you or us, you must
              promptly uninstall the App on all of your devices and destroy all
              materials downloaded or otherwise obtained from the Service, all
              Documentation, and all copies of such materials and Documentation.
              Termination of these terms shall be subject to any portions hereof
              that impliedly survive expiration or termination.
            </p>

            <h2 className="ermsBodyH2">ENTIRE AGREEMENT</h2>
            <p>
              These terms constitute the entire agreement between you & Nello
              pertaining to the subject matter hereof. Anything contained in or
              delivered through the Service that is inconsistent with or
              conflicts with the terms of this Agreement is superseded by the
              terms of this Agreement. This Agreement may not be modified, in
              whole or in part, except as described elsewhere in this Agreement.
              This agreement may be superseded by any subsequent terms agreed
              between an individual and Nello
            </p>

            <h2 className="ermsBodyH2">SEVERABILITY</h2>
            <p>
              If any of the provisions of this Agreement are held to be not
              enforceable by a court or other tribunal of competent
              jurisdiction, then such provisions shall be amended, limited or
              eliminated to the minimum extent necessary so that this Agreement
              shall otherwise remain in full force and effect.
            </p>
            <h2 className="ermsBodyH2">ASSIGNABILITY</h2>
            <p>
              You agree that this Agreement and all incorporated agreements
              between you and us may be assigned by us, in our sole discretion
              to any third party.
            </p>

            <h2>CONTACT INFORMATION</h2>
            <p>
              All notices to you relating to this Agreement shall be posted on
              the Service or sent to you at the e-mail or physical address, if
              any, that you provided to us. All notices to us relating to this
              Agreement may be made by e-mail to info@asknello.com
            </p>

            <h2></h2>
          </div>
        </div>
      </section>
    </>
  );
}
