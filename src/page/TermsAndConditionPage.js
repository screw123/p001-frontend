import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'

const BigImg = styled.img`
    max-width: auto;
    height: 100%;
    filter: brightness(50%)
`

const BasicParallaxDiv = styled.div`
    perspective: 1px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    perspective-origin-x: 100%;
    margin: 0;
`

const ParallaxGroup = styled.div`
    position: relative;
    height: 100vh;
    transform-style: preserve-3d;
    margin: 0;
`

const BackLayer = styled.div`
    transform: translateZ(-3px) scale(4);
    transform-origin-x: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
`

const FrontLayer = styled.div`
    transform: translateZ(0);
    transform-origin-x: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
`

const H1 = styled.h1`
    color: white;
`

const PA = styled.p`
    color: white;
`

class TermsAndConditionPage extends React.Component {
    
    
    render = () => (
        <div>
            <p>Summary

Following continued requests, this article analyzes MAIN’s dividend sustainability by performing three tests based on recent historical and projected future quarterly results.

The first two tests analyze MAIN’s net ICTI and cumulative UTI which are based on IRC methodologies.

The third test focuses on the probability of MAIN continuing to provide special periodic dividends in the future. This includes a projection for the second half of 2018.

This article also provides cumulative UTI coverage ratios for thirteen BDC stocks I currently cover (very good dividend sustainability metric).

Summarized results from the three tests performed, including a projection for MAIN’s monthly dividend for September-November 2018, are stated within the “Conclusions Drawn” section of the article.

Author’s Note: This article is a detailed analysis of Main Street Capital Corp.’s (MAIN) dividend sustainability. I have performed this analysis due to the continued number of readers who have specifically requested such an analysis be performed on MAIN at periodic intervals. For readers who just want the summarized conclusions/results, I would suggest to scroll down to the “Conclusions Drawn” section at the bottom of the article.
Focus Of Article:

The focus of this article is to provide a detailed analysis with supporting documentation (via three tests) on the near-term dividend sustainability of MAIN. This analysis will be provided after a brief overview of MAIN’s regulated investment company (“RIC”) classification per the Internal Revenue Code (“IRC”). The first two tests will focus on MAIN’s net investment company taxable income (“ICTI”) and the company’s undistributed taxable income (“UTI”).

These two tests will be termed “TEST 1” and “TEST 2.” The third test will focus on MAIN’s unrealized appreciation on investments account and be termed “TEST 3.” At the end of this article, there will be a conclusion based on the results obtained from TEST 1, TEST 2, and TEST 3 about the near-term dividend sustainability of MAIN. I will also provide my projection regarding MAIN’s monthly dividend per share rate for September-November 2018 and my projection regarding the company’s special periodic dividend for the second half of 2018.</p>
            {false && <I18n>
            {(t) => (
                <BasicParallaxDiv>
                    
                    <ParallaxGroup>
                        <BackLayer>
                            <BigImg src="https://www.vivavhs.co.uk/wp-content/uploads/2013/02/8.jpg" />
                        </BackLayer>
                        <FrontLayer>
                            <H1>{t('Terms and Condition')}!</H1>
                            <PA>Chris is expanding this article into a book, due out in May 2006. Follow his continuing coverage of the subject on The Long Tail blog.</PA>
                            <PA>In 1988, a British mountain climber named Joe Simpson wrote a book called Touching the Void, a harrowing account of near death in the Peruvian Andes. It got good reviews but, only a modest success, it was soon forgotten. Then, a decade later, a strange thing happened. Jon Krakauer wrote Into Thin Air, another book about a mountain-climbing tragedy, which became a publishing sensation. Suddenly Touching the Void started to sell again.</PA>
                            <PA>Random House rushed out a new edition to keep up with demand. Booksellers began to promote it next to their Into Thin Air displays, and sales rose further. A revised paperback edition, which came out in January, spent 14 weeks on the New York Times bestseller list. That same month, IFC Films released a docudrama of the story to critical acclaim. Now Touching the Void outsells Into Thin Air more than two to one.</PA>
                            <PA>What happened? In short, Amazon.com recommendations. The online bookseller&#39;s software noted patterns in buying behavior and suggested that readers who liked Into Thin Air would also like Touching the Void. People took the suggestion, agreed wholeheartedly, wrote rhapsodic reviews. More sales, more algorithm-fueled recommendations, and the positive feedback loop kicked in.</PA>
                            <PA>Particularly notable is that when Krakauer&#39;s book hit shelves, Simpson&#39;s was nearly out of print. A few years ago, readers of Krakauer would never even have learned about Simpson&#39;s book - and if they had, they wouldn&#39;t have been able to find it. Amazon changed that. It created the Touching the Void phenomenon by combining infinite shelf space with real-time information about buying trends and public opinion. The result: rising demand for an obscure book.
                            Trending Now
                            Movies &amp; TV
                            Jodie Foster Answers the Web&#39;s Most Searched Questions</PA>
                            <PA>This is not just a virtue of online booksellers; it is an example of an entirely new economic model for the media and entertainment industries, one that is just beginning to show its power. Unlimited selection is revealing truths about what consumers want and how they want to get it in service after service, from DVDs at Netflix to music videos on Yahoo! Launch to songs in the iTunes Music Store and Rhapsody. People are going deep into the catalog, down the long, long list of available titles, far past what&#39;s available at Blockbuster Video, Tower Records, and Barnes &amp; Noble. And the more they find, the more they like. As they wander further from the beaten path, they discover their taste is not as mainstream as they thought (or as they had been led to believe by marketing, a lack of alternatives, and a hit-driven culture).</PA>
                            <PA>An analysis of the sales data and trends from these services and others like them shows that the emerging digital entertainment economy is going to be radically different from today&#39;s mass market. If the 20th- century entertainment industry was about hits, the 21st will be equally about misses.</PA>
                            <PA>For too long we&#39;ve been suffering the tyranny of lowest-common-denominator fare, subjected to brain-dead summer blockbusters and manufactured pop. Why? Economics. Many of our assumptions about popular taste are actually artifacts of poor supply-and-demand matching - a market response to inefficient distribution.</PA>
                            <PA>The main problem, if that&#39;s the word, is that we live in the physical world and, until recently, most of our entertainment media did, too. But that world puts two dramatic limitations on our entertainment.</PA>
                            <PA>The first is the need to find local audiences. An average movie theater will not show a film unless it can attract at least 1,500 people over a two-week run; that&#39;s essentially the rent for a screen. An average record store needs to sell at least two copies of a CD per year to make it worth carrying; that&#39;s the rent for a half inch of shelf space. And so on for DVD rental shops, videogame stores, booksellers, and newsstands.</PA>
                            <PA>In each case, retailers will carry only content that can generate sufficient demand to earn its keep. But each can pull only from a limited local population - perhaps a 10-mile radius for a typical movie theater, less than that for music and bookstores, and even less (just a mile or two) for video rental shops. It&#39;s not enough for a great documentary to have a potential national audience of half a million; what matters is how many it has in the northern part of Rockville, Maryland, and among the mall shoppers of Walnut Creek, California.</PA>
                            <PA>There is plenty of great entertainment with potentially large, even rapturous, national audiences that cannot clear that bar. For instance, The Triplets of Belleville, a critically acclaimed film that was nominated for the best animated feature Oscar this year, opened on just six screens nationwide. An even more striking example is the plight of Bollywood in America. Each year, India&#39;s film industry puts out more than 800 feature films. There are an estimated 1.7 million Indians in the US. Yet the top-rated (according to Amazon&#39;s Internet Movie Database) Hindi-language film, Lagaan: Once Upon a Time in India, opened on just two screens, and it was one of only a handful of Indian films to get any US distribution at all. In the tyranny of physical space, an audience too thinly spread is the same as no audience at all.</PA>
                            <PA>The other constraint of the physical world is physics itself. The radio spectrum can carry only so many stations, and a coaxial cable so many TV channels. And, of course, there are only 24 hours a day of programming. The curse of broadcast technologies is that they are profligate users of limited resources. The result is yet another instance of having to aggregate large audiences in one geographic area - another high bar, above which only a fraction of potential content rises.</PA>
                            <PA>The past century of entertainment has offered an easy solution to these constraints. Hits fill theaters, fly off shelves, and keep listeners and viewers from touching their dials and remotes. Nothing wrong with that; indeed, sociologists will tell you that hits are hardwired into human psychology, the combinatorial effect of conformity and word of mouth. And to be sure, a healthy share of hits earn their place: Great songs, movies, and books attract big, broad audiences.</PA>
                            <PA>But most of us want more than just hits. Everyone&#39;s taste departs from the mainstream somewhere, and the more we explore alternatives, the more we&#39;re drawn to them. Unfortunately, in recent decades such alternatives have been pushed to the fringes by pumped-up marketing vehicles built to order by industries that desperately need them.</PA>
                            <PA>Hit-driven economics is a creation of an age without enough room to carry everything for everybody. Not enough shelf space for all the CDs, DVDs, and games produced. Not enough screens to show all the available movies. Not enough channels to broadcast all the TV programs, not enough radio waves to play all the music created, and not enough hours in the day to squeeze everything out through either of those sets of slots.</PA>
                            <PA>This is the world of scarcity. Now, with online distribution and retail, we are entering a world of abundance. And the differences are profound.</PA>
                            <PA>To see how, meet Robbie Vann-Adibe, the CEO of Ecast, a digital jukebox company whose barroom players offer more than 150,000 tracks - and some surprising usage statistics. He hints at them with a question that visitors invariably get wrong: &quot;What percentage of the top 10,000 titles in any online media store (Netflix, iTunes, Amazon, or any other) will rent or sell at least once a month?&quot;</PA>
                            <PA>Most people guess 20 percent, and for good reason: We&#39;ve been trained to think that way. The 80-20 rule, also known as Pareto&#39;s principle (after Vilfredo Pareto, an Italian economist who devised the concept in 1906), is all around us. Only 20 percent of major studio films will be hits. Same for TV shows, games, and mass-market books - 20 percent all. The odds are even worse for major-label CDs, where fewer than 10 percent are profitable, according to the Recording Industry Association of America.</PA>
                            <PA>But the right answer, says Vann-Adibe, is 99 percent. There is demand for nearly every one of those top 10,000 tracks. He sees it in his own jukebox statistics; each month, thousands of people put in their dollars for songs that no traditional jukebox anywhere has ever carried.</PA>
                            <PA>People get Vann-Adibe&#39;s question wrong because the answer is counterintuitive in two ways. The first is we forget that the 20 percent rule in the entertainment industry is about hits, not sales of any sort. We&#39;re stuck in a hit-driven mindset - we think that if something isn&#39;t a hit, it won&#39;t make money and so won&#39;t return the cost of its production. We assume, in other words, that only hits deserve to exist. But Vann-Adibe, like executives at iTunes, Amazon, and Netflix, has discovered that the &quot;misses&quot; usually make money, too. And because there are so many more of them, that money can add up quickly to a huge new market.</PA>
                            <PA>With no shelf space to pay for and, in the case of purely digital services like iTunes, no manufacturing costs and hardly any distribution fees, a miss sold is just another sale, with the same margins as a hit. A hit and a miss are on equal economic footing, both just entries in a database called up on demand, both equally worthy of being carried. Suddenly, popularity no longer has a monopoly on profitability.</PA>
                            <PA>The second reason for the wrong answer is that the industry has a poor sense of what people want. Indeed, we have a poor sense of what we want. We assume, for instance, that there is little demand for the stuff that isn&#39;t carried by Wal-Mart and other major retailers; if people wanted it, surely it would be sold. The rest, the bottom 80 percent, must be subcommercial at best.</PA>
                            <PA>But as egalitarian as Wal-Mart may seem, it is actually extraordinarily elitist. Wal-Mart must sell at least 100,000 copies of a CD to cover its retail overhead and make a sufficient profit; less than 1 percent of CDs do that kind of volume. What about the 60,000 people who would like to buy the latest Fountains of Wayne or Crystal Method album, or any other nonmainstream fare? They have to go somewhere else. Bookstores, the megaplex, radio, and network TV can be equally demanding. We equate mass market with quality and demand, when in fact it often just represents familiarity, savvy advertising, and broad if somewhat shallow appeal. What do we really want? We&#39;re only just discovering, but it clearly starts with more.</PA>
                            <PA>To get a sense of our true taste, unfiltered by the economics of scarcity, look at Rhapsody, a subscription-based streaming music service (owned by RealNetworks) that currently offers more than 735,000 tracks.</PA>
                            <PA>Chart Rhapsody&#39;s monthly statistics and you get a &quot;power law&quot; demand curve that looks much like any record store&#39;s, with huge appeal for the top tracks, tailing off quickly for less popular ones. But a really interesting thing happens once you dig below the top 40,000 tracks, which is about the amount of the fluid inventory (the albums carried that will eventually be sold) of the average real-world record store. Here, the Wal-Marts of the world go to zero - either they don&#39;t carry any more CDs, or the few potential local takers for such fringy fare never find it or never even enter the store.</PA>
                            <PA>The Rhapsody demand, however, keeps going. Not only is every one of Rhapsody&#39;s top 100,000 tracks streamed at least once each month, the same is true for its top 200,000, top 300,000, and top 400,000. As fast as Rhapsody adds tracks to its library, those songs find an audience, even if it&#39;s just a few people a month, somewhere in the country.</PA>
                            <PA>This is the Long Tail.</PA>
                            <PA>You can find everything out there on the Long Tail. There&#39;s the back catalog, older albums still fondly remembered by longtime fans or rediscovered by new ones. There are live tracks, B-sides, remixes, even (gasp) covers. There are niches by the thousands, genre within genre within genre: Imagine an entire Tower Records devoted to &#39;80s hair bands or ambient dub. There are foreign bands, once priced out of reach in the Import aisle, and obscure bands on even more obscure labels, many of which don&#39;t have the distribution clout to get into Tower at all.</PA>
                            <PA>Oh sure, there&#39;s also a lot of crap. But there&#39;s a lot of crap hiding between the radio tracks on hit albums, too. People have to skip over it on CDs, but they can more easily avoid it online, since the collaborative filters typically won&#39;t steer you to it. Unlike the CD, where each crap track costs perhaps one-twelfth of a $15 album price, online it just sits harmlessly on some server, ignored in a market that sells by the song and evaluates tracks on their own merit.</PA>
                            <PA>What&#39;s really amazing about the Long Tail is the sheer size of it. Combine enough nonhits on the Long Tail and you&#39;ve got a market bigger than the hits. Take books: The average Barnes &amp; Noble carries 130,000 titles. Yet more than half of Amazon&#39;s book sales come from outside its top 130,000 titles. Consider the implication: If the Amazon statistics are any guide, the market for books that are not even sold in the average bookstore is larger than the market for those that are (see Anatomy of the Long Tail).</PA>

                        </FrontLayer>
                    </ParallaxGroup>
                </BasicParallaxDiv>
            )}
        </I18n>}
        </div>
    )
}

export default TermsAndConditionPage