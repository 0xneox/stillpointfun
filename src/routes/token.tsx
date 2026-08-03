import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/token")({
  head: () => ({
    meta: [
      { title: "$STILL Token — The Still Point" },
      { name: "description", content: "The ritual instrument and attention token of The Still Point." },
      { property: "og:title", content: "$STILL Token — The Still Point" },
      { property: "og:description", content: "The ritual instrument and attention token of The Still Point." },
      { property: "og:url", content: "/token" },
    ],
    links: [{ rel: "canonical", href: "/token" }],
  }),
  component: Token,
});

function Token() {
  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">$STILL Token</span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          Hold the Center
        </h1>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center space-y-8">
          <p className="font-display text-2xl md:text-3xl leading-[1.4] text-balance">
            $STILL is not a meme coin. It is a ritual instrument and living yantra.
          </p>
          <p className="text-base opacity-70 italic max-w-xl mx-auto">
            It represents concentrated attention, presence, and participation in the mandala. Its value emerges from the depth of the field, not hype.
          </p>
        </div>
      </section>

      {/* Token Specs */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Token Specifications</span>
          <h2 className="font-display italic text-4xl md:text-5xl mt-6 text-balance">
            The Foundation
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-8 text-lg leading-[1.7] opacity-90">
            <div className="border-t border-surface-foreground/20 pt-6">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-2">Token Name</span>
              <p className="font-display text-2xl">$STILL</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-2">Symbol</span>
              <p className="font-display text-2xl">ॐ</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-2">Chain</span>
              <p className="font-display text-2xl">Solana</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-2">Total Supply</span>
              <p className="font-display text-2xl">888,888,888</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Benefits */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Available Now</span>
        <h2 className="font-display italic text-4xl md:text-5xl mb-12">
          Current Holder Benefits
        </h2>
        
        <div className="space-y-8">
          <div className="border-t border-border pt-8">
            <h3 className="font-display text-2xl mb-3">Still Board Verified Badge</h3>
            <p className="text-base opacity-80 leading-relaxed">
              Display a verified badge on your Still Board posts, showing your participation in the mandala.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="font-display text-2xl mb-3">Live Still Score Participation</h3>
            <p className="text-base opacity-80 leading-relaxed">
              Your practice minutes contribute to the collective Still Score tracker, visible to the community.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="font-display text-2xl mb-3">Priority in Live Sessions</h3>
            <p className="text-base opacity-80 leading-relaxed">
              When live sessions launch, token holders receive priority access and recognition during Q&A.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="font-display text-2xl mb-3">Access to Full Archives</h3>
            <p className="text-base opacity-80 leading-relaxed">
              Complete access to session recordings, transcripts, and the full teaching library.
            </p>
          </div>
        </div>
      </section>

      {/* Phased Utilities */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Unfolding Recognition</span>
          <h2 className="font-display italic text-4xl md:text-5xl mb-12">
            As the Field Deepens
          </h2>
          
          <div className="space-y-12">
            <div className="border-l-2 border-surface-foreground/30 pl-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent block mb-2">Phase 1 — Deepening</span>
              <h3 className="font-display text-2xl mb-4">Inner Sessions & Presence Tracking</h3>
              <ul className="space-y-2 text-base opacity-80">
                <li>• Token-gated Inner Still Point sessions (deeper, smaller, higher signal)</li>
                <li>• Stake $STILL to mint Presence NFTs (on-chain participation tracking)</li>
                <li>• Priority Q&A selection + ability to submit topics for future transmissions</li>
                <li>• Weighted question system based on stake duration and amount</li>
              </ul>
            </div>

            <div className="border-l-2 border-surface-foreground/30 pl-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent block mb-2">Phase 2 — Governance</span>
              <h3 className="font-display text-2xl mb-4">Community Direction</h3>
              <ul className="space-y-2 text-base opacity-80">
                <li>• DAO governance on treasury and content direction</li>
                <li>• Revenue share flows to $STILL stakers via on-chain distributions</li>
                <li>• Create and vote on "Collective Sadhanas" — community-wide practices</li>
                <li>• Integration with major Solana governance tools</li>
              </ul>
            </div>

            <div className="border-l-2 border-surface-foreground/30 pl-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent block mb-2">Phase 3 — Manifestation</span>
              <h3 className="font-display text-2xl mb-4">Beyond the Screen</h3>
              <ul className="space-y-2 text-base opacity-80">
                <li>• IRL Still Point gatherings / retreats</li>
                <li>• On-chain ritual engine: Burn $STILL during transmissions</li>
                <li>• Soulbound "Lineage" series for long-term holders</li>
                <li>• API access for ecosystem builders</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-surface-foreground/20">
            <p className="text-sm opacity-70 italic">
              These phases unfold naturally as recognition deepens in the field. There is no rush — the center is already here.
            </p>
          </div>
        </div>
      </section>

      {/* Recognition Milestones */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Recognition Milestones</span>
          <h2 className="font-display italic text-4xl md:text-5xl mb-12">
            As Recognition Deepens
          </h2>
          
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-xl mb-2">Bindu Ignited</h3>
              <p className="text-base opacity-70">Official launch + first transmission</p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-xl mb-2">The Mandala Opens</h3>
              <p className="text-base opacity-70">Inner Still Point rooms + deeper community practices</p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-xl mb-2">Spanda Awakens</h3>
              <p className="text-base opacity-70">Dynamic Presence tracking + revenue share begins</p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-xl mb-2">Lila Governance</h3>
              <p className="text-base opacity-70">Full DAO + treasury direction by community</p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-xl mb-2">Beyond the Screen</h3>
              <p className="text-base opacity-70">First IRL Still Point gathering</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm opacity-70 italic">
              These milestones represent natural unfolding as the field of recognition deepens. They are not targets — they are recognition of what is already happening.
            </p>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Tokenomics</span>
        <h2 className="font-display italic text-4xl md:text-5xl mb-12">
          Fair Launch Model
        </h2>
        
        <div className="space-y-8">
          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-4">Launch Platform</span>
            <p className="text-base opacity-80">
              Fair launch via pump.fun → Raydium migration. No private allocation, no presale, no team tokens before public launch.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-4">Post-Launch Distribution</span>
            <div className="space-y-3 text-base opacity-80">
              <div className="flex justify-between"><span>100%</span><span>Community fair launch (pump.fun)</span></div>
              <div className="flex justify-between"><span>5%</span><span>Community treasury (funded from market, team buys on open market)</span></div>
              <div className="flex justify-between"><span>3%</span><span>Team allocation (12-month linear vest, purchased on open market)</span></div>
              <div className="flex justify-between"><span>2%</span><span>Airdrops & Sangha Rewards (funded from treasury)</span></div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-4">Taxes</span>
            <div className="space-y-2 text-base opacity-80">
              <div className="flex justify-between"><span>0%</span><span>Buy tax</span></div>
              <div className="flex justify-between"><span>0%</span><span>Sell tax</span></div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-4">Liquidity</span>
            <p className="text-base opacity-80">
              Initial liquidity provided by pump.fun community. Post-migration liquidity will be burned for maximum safety.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-4">Deflation</span>
            <p className="text-base opacity-80">
              Community-driven burns during live streams + optional major burn rituals. No inflationary mechanics.
            </p>
          </div>
        </div>
      </section>

      {/* Evergreen Mechanics */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Evergreen Mechanics</span>
          <h2 className="font-display italic text-4xl md:text-5xl mb-12">
            Living Systems
          </h2>
          
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <div className="border-t border-surface-foreground/20 pt-6">
              <h3 className="font-display text-xl mb-2">Spanda Burn</h3>
              <p className="text-base opacity-80">Optional community burns during live streams create deflation + strong narrative</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <h3 className="font-display text-xl mb-2">Offering Altar</h3>
              <p className="text-base opacity-80">Real-time on-stream donations visible with beautiful visual effects</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <h3 className="font-display text-xl mb-2">Karmic Multiplier</h3>
              <p className="text-base opacity-80">Longer staking + consistent participation increases rewards and status</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Credibility */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Technical Credibility</span>
          <h2 className="font-display italic text-4xl md:text-5xl mb-12">
            Transparency & Safety
          </h2>
          
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <div className="border-t border-surface-foreground/20 pt-6">
              <h3 className="font-display text-xl mb-2">Fair Launch Verification</h3>
              <p className="text-base opacity-80">pump.fun launch ensures no pre-mint, no private allocation, and equal access for all participants. Contract verified on Solana explorer.</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <h3 className="font-display text-xl mb-2">Liquidity Safety</h3>
              <p className="text-base opacity-80">Post-Raydium migration, liquidity will be burned to dead address for maximum safety and trust.</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <h3 className="font-display text-xl mb-2">Team Transparency</h3>
              <p className="text-base opacity-80">Team allocation purchased on open market after launch, not pre-minted. Vesting schedule publicly tracked on-chain.</p>
            </div>
            <div className="border-t border-surface-foreground/20 pt-6">
              <h3 className="font-display text-xl mb-2">Treasury Management</h3>
              <p className="text-base opacity-80">Community treasury controlled by transparent multisig with public voting on major decisions after $10M MC milestone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Info */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-8">
          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-2">Launch Platform</span>
            <p className="font-mono text-sm opacity-70">pump.fun → Raydium migration</p>
          </div>
          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-2">Token Address</span>
            <p className="font-mono text-sm opacity-70">Deploying at launch</p>
          </div>
          <div className="border-t border-border pt-8">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-2">Chart</span>
            <p className="font-mono text-sm opacity-70">Birdeye / Dexscreener coming at launch</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Buy $STILL • Hold the Center
          </h2>
          <button className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors">
            Launching on pump.fun
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-sm opacity-60 leading-relaxed space-y-4">
          <p className="font-mono text-[10px] tracking-widest uppercase">Disclaimer</p>
          <p>
            $STILL is a participatory token created to support and deepen engagement with The Still Point transmission. It is not an investment product. Cryptocurrency involves substantial risk. The true Still Point cannot be bought — only recognized.
          </p>
        </div>
      </section>
    </div>
  );
}
