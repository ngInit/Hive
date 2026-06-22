import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

interface AboutAuthor {
  name: string;
  role: string;
  avatar: string;
  photo: string;
  description: string;
  socials: {
    github: string;
    rss_profile: string;
  };
}

@Component({
  selector: 'hive-about-page',
  imports: [MatCardModule, MatButton],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  aboutAuthors: AboutAuthor[] = [
    {
      name: 'Aleksei Nikolaev',
      role: 'Role: All in one',
      avatar: 'https://avatars.githubusercontent.com/u/122630180?v=4',
      photo:
        'https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/490815157_9515783105209563_1840217380200187705_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=-xv8ZJi7cGwQ7kNvwHVFw1c&_nc_oc=Adq3aHOzT6rUCwvganhYXLoAxSIPcRamRs0xNGkevAgxGjWkXzTO2Ik1WA3xdEfCVfQ&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=KLc91yk6Qxfc_RrMm4lnqw&_nc_ss=7b2a8&oh=00_Af6eJgiQwKp_c8Xesa0g_WY6WlGp5ckX_B0tauBtm3hSLQ&oe=6A1B2321',
      description: `You hear that Mr. Anderson?... I'm  patient developer, photographer and restorer who loves to code and create new things.`,
      socials: {
        github: 'https://github.com/ngInit',
        rss_profile: 'https://app.rs.school/cv/05ed40cb-8d29-4ee8-b942-3678b9ff69ce',
      },
    },
  ];

  projectDescription = `Hive - is a fully functional clone of a modern music streaming service.
  The platform is designed as an interactive single-page web application (SPA),
  providing users with a seamless and intuitive real-time audio experience.
  The core focus is on high performance, a clean user interface, and effortless media library management.`;
}
