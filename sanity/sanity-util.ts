import { client } from "./client";
import { groq } from "next-sanity";
import { buildQuery } from "./buildQuery";

// export interface Upcomingevents {
//     totaldays: number;
//     students: number;
//     eventname: string;
//     organizer: string;
//     prizepool: number;
//     eventTopic: string;
//     participationfee: string;
//     location: string;
//     startdate: string;
//     slug: string;
// }
// export interface GetEventProps {
//     query: string;
//     page: string;
// }
// export interface EventTopicProps {
//     title: string;
//     _id: string;
//     slug: string;
//     image: string;
//     logo: string;
// }

export interface Doctor {
    name: string;
    doctorid: string;
    _id: string;
    slug: string;
    image: string;
    specialty: string;
    phone: string;
    email: string;
    location: string;
    pastExperience: string[];
    education: string[];
    bio: string;
    certifications: string[];
    degreeProof: string;
    timing: string;
}

export interface Specialty {
    _id: string;
    name: string;
    description: string;
}

export interface Work {
    hospital: string;
    year: string;
}

export interface Education {
    college: string;
    degree: string;
    year: string;
}

export async function getDoctors(): Promise<Doctor[]> {
    return client.fetch(groq`*[_type == "doctor"]{
        name,
        _id,
        doctorid,
        "slug": slug.current,
        "image": image.asset->url,
        "specialty":specialty._ref,
        phone,
        email,
        location,
        "pastExperience": pastExperience[]._ref,
        "education": education[]._ref,
        bio,
        "certifications" : certifications[].asset->url,
        "degreeProof": degreeProof.asset->url,
        timing
    }
`)
}

export async function getDoctorBySlug(slug: string): Promise<Doctor> {
    return client.fetch(groq`*[_type == "doctor" && slug.current == "${slug}"][0]{
        name,
        _id,
        "slug": slug.current,
        "image": image.asset->url,
        "specialty":specialty._ref,
        phone,
        doctorid,
        email,
        location,
        "pastExperience": pastExperience[]._ref,
        "education": education[]._ref,
        bio,
        "certifications" : certifications[].asset->url,
        "degreeProof": degreeProof.asset->url,
        timing
    }
`, { slug })
}

export async function getSpecialties(): Promise<Specialty[]> {
    return client.fetch(groq`*[_type == "specialty" ]{
        _id,
        "name": title,
        description
    }
`)
}

export async function getSpecialtiesById(id: string): Promise<Specialty> {
    return client.fetch(groq`*[_type == "specialty" && _id=="${id}"][0]{
        "name": title,
        description
    }
`)
}

export async function getWork(id: string[]): Promise<Work[]> {
    return client.fetch(groq`*[_type == "workandexperience" && _id=="${id}"]{
        hospital,
        year,
    }
`, { id })
}

export async function getEducationById(id: string[]): Promise<Education[]> {
    return client.fetch(groq`*[_type == "education" && _id=="${id}"]{
        college,
        degree,
        year
    }`, { id })
}
// export async function getEvents({ query, page }: GetEventProps): Promise<EventTopicProps[]> {

//     return client.fetch(groq`${buildQuery({
//         type: 'eventTopic',
//         query,
//         page: parseInt(page),
//     })}{
//         title,
//         _id,
//        "slug":slug.current,
//        "image": topicImage.asset->url,
//        "logo": logo.asset->url
//       }`
//     )
// }

// export async function getEventBySlug(slug: string): Promise<EventTopicProps> {
//     return client.fetch(groq`*[_type == "eventTopic" && slug.current == "${slug}"][0]{
//         title
//         ,_id,
//         "slug":slug.current,
//         "image":topicImage.asset->url,
//         "logo":logo.asset->url
//     }`,
//         { slug }
//     )
// }

// export async function getUpcomingevents({ query, page }: GetEventProps): Promise<Upcomingevents[]> {
//     return client.fetch(groq`${buildQuery({
//         type: 'upcomingevents',
//         query,
//         page: parseInt(page),
//     })}{
//         totaldays,
// students,
// eventname,
// organizer,
// prizepool,
// eventTopic,
// participationfee,
// location,
// startdate,
// "slug":slug.current,
//       }`)
// }

// export async function getUpcomingeventsBySlug(slug: string): Promise<Upcomingevents> {
//     return client.fetch(groq`*[_type == "upcomingevents" && slug.current == "${slug}"][0]{
//         totaldays,
//         students,
//         eventname,
//         organizer,
//         prizepool,
//         eventTopic,
//         participationfee,
//         location,
//         startdate,
//         "slug":slug.current,
//               }`,
//         { slug }
//     )
// }
// export async function getProjectBySlug(slug: string): Promise<Project> {
//     return client.fetch(groq`*[_type == "projects" && slug.current == "${slug}"][0]{
//         title,
//         _id,
//         githubLink,
//         subtitle,
//         "image": projectImage.asset->url,
//         views,
//         "slug":slug.current,
//         category,
//         description,
//         techStack,
//         liveLink
//       }`,
//         { slug }
//     )
// }

// export async function getGames(): Promise<Games[]> {
//     return client.fetch(groq`*[_type == "events"]{
//         title,
//         "slug":slug.current,
//           "image": games.asset->url,
//           "logo": logo.asset->url
//       }`)
// }

// export async function getGamesBySlug(slug: string): Promise<Games> {
//     return client.fetch(groq`*[_type == "events" && slug.current == "${slug}"][0]{
//         title,
//         "slug":slug.current,
//           "image": games.asset->url,
//           "logo": logo.asset->url
//       }`,
//         { slug }
//     )
// }
// export async function getTournament(): Promise<Tournament[]> {
//     return client.fetch(groq`*[_type == "upcomingevents"]{
//         eventname,
//         "event":slug.current,
//         countdown,
//         startdate,
//         player,
//         prizepool,
//         organizer,
//         participationfee,
//         location,
//         gametype
//       }`)
// }

// export async function getTournamentBySlug(slug: string): Promise<Tournament> {
//     return client.fetch(groq`*[_type == "upcomingevents" && slug.current == "${slug}"][0]{
//         eventname,
//         "event":slug.current,
//         countdown,
//         startdate,
//         player,
//         prizepool,
//         organizer,
//         participationfee,
//         location,
//         gametype
//       }`,
//         { slug }
//     )
// }