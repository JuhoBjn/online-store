import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CompactArticleList from "./CompactArticleList";

describe("The compact article list component", () => {
  const testArticles = [
    {
      id: 6,
      headline: "Li Europan lingues es membres del sam familie",
      body: "Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.",
      picture_id: null,
      link: "https://example.com",
      created_at: "2023-12-02T16:45:59.000Z",
      updated_at: "2023-12-02T16:45:59.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 5,
      headline: "The quick, brown fox jumps over a lazy dog.",
      body: 'DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard&apos;s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek&apos;s fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.',
      picture_id: null,
      link: "https://example.com",
      created_at: "2023-12-02T16:45:59.000Z",
      updated_at: "2023-12-02T16:45:59.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 4,
      headline: "Far far away, behind the word mountains",
      body: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn&apos;t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.",
      picture_id: null,
      link: "https://example.com",
      created_at: "2023-12-02T16:45:59.000Z",
      updated_at: "2023-12-02T16:45:59.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 3,
      headline: "The European languages are members of the same family",
      body: "Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.",
      picture_id: null,
      link: "https://example.com",
      created_at: "2023-12-02T16:45:59.000Z",
      updated_at: "2023-12-02T16:45:59.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 2,
      headline:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      body: "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt",
      picture_id: null,
      link: "https://example.com",
      created_at: "2023-12-02T16:45:59.000Z",
      updated_at: "2023-12-02T16:45:59.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 1,
      headline: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
      body: "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
      picture_id: null,
      link: "https://example.com",
      created_at: "2023-12-02T16:45:59.000Z",
      updated_at: "2023-12-02T16:45:59.000Z",
      image_object_key: null,
      image_url: null
    }
  ];

  it("should display an unordered list element", () => {
    render(
      <BrowserRouter>
        <CompactArticleList articles={testArticles} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("compact-article-list")).toBeInTheDocument();
  });

  it("should display a list of news article headlines when articles are provided", () => {
    render(
      <BrowserRouter>
        <CompactArticleList articles={testArticles} />
      </BrowserRouter>
    );

    expect(
      screen.getAllByTestId("compact-article-list-item").length
    ).toBeGreaterThan(0);
  });

  it("should display an edit button on artile listing items", () => {
    render(
      <BrowserRouter>
        <CompactArticleList
          articles={[
            {
              id: 1,
              headline:
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              body: "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
              picture_id: null,
              link: "https://example.com",
              created_at: "2023-12-02T16:45:59.000Z",
              updated_at: "2023-12-02T16:45:59.000Z",
              image_object_key: null,
              image_url: null
            }
          ]}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("compact-article-list-item")).toBeInTheDocument();
    expect(screen.getByTestId("edit-article-button")).toBeInTheDocument();
  });

  it("should display a message if no articles are provided", () => {
    render(
      <BrowserRouter>
        <CompactArticleList />
      </BrowserRouter>
    );

    expect(screen.getByTestId("no-articles-found")).toBeInTheDocument();
  });
});
