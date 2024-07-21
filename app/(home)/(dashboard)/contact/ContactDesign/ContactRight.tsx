import Link from "next/link";
import React from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
  DiscordLogoIcon,
  CodeIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Twitter } from "lucide-react";
const ContactRight = () => {
  return (
    <main className="text-center">
      <div className="z-10">
        <h5 className="text-2xl lg:text-4xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] text-xl mb-4 px-1 lg:px-10">
          Feel free to reach out to me for any queries related to our site. This
          site is made to help you to access the best health care services.
        </p>
        <div className="socials flex flex-row justify-center gap-2">
          <Link
            href="https://github.com/MediAssist-chougale-17"
            target="_blank"
          >
            <GitHubLogoIcon height={25} width={25} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/MediAssist-chougale/"
            target="_blank"
          >
            <LinkedInLogoIcon height={25} width={25} />
          </Link>
          <Link
            href="https://www.instagram.com/MediAssist_chougale_17/"
            target="_blank"
          >
            <InstagramLogoIcon height={25} width={25} />
          </Link>
          <Link
            href="https://discord.com/channels/@MediAssistchougale"
            target="_blank"
          >
            <DiscordLogoIcon height={25} width={25} />
          </Link>
          <Link
            href="https://www.codechef.com/users/MediAssist1717"
            target="_blank"
          >
            <CodeIcon height={25} width={25} />
          </Link>
          <Link href="mailto:MediAssist17170@gmail.com" target="_blank">
            <ChatBubbleIcon height={25} width={25} />
          </Link>
          <Link href="https://twitter.com/MediAssist_7717" target="_blank">
            <Twitter />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ContactRight;
