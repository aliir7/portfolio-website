import Link from "next/link";
import { Button } from "../ui/button";
import { RiArrowRightDownLine, RiDownloadLine } from "@remixicon/react";
import { socialLinks } from "@/lib/constants";

const Home = () => {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-foreground/5 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Text content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Available for freelance projects
            </div>

            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Personal Portfolio
              </p>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl">
                سلام، من
                <span className="block text-primary">زوئی میلر هستم</span>
                طراح و توسعه‌دهنده‌ی رابط کاربری
              </h1>

              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                من تجربه‌ی ساخت وب‌سایت‌های مینیمال، لوکس و کاربرمحور را دارم؛
                از طراحی هویت بصری تا پیاده‌سازی دقیق فرانت‌اند با تمرکز بر
                جزئیات، سرعت و تجربه‌ی کاربری.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="#projects">
                  مشاهده پروژه‌ها
                  <RiArrowRightDownLine className="mr-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6"
              >
                <Link href="/resume.pdf" target="_blank" rel="noreferrer">
                  دانلود رزومه
                  <RiDownloadLine className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-sm text-muted-foreground">Follow me:</span>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.label}
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm"
                    >
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />

            <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/70 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-muted-foreground">
                  Zoe Miller / Portfolio
                </span>
              </div>

              <div className="grid gap-0 md:grid-cols-2">
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      About
                    </p>
                    <h2 className="text-2xl font-semibold leading-tight">
                      طراحی تمیز، مینیمال و هدفمند برای برندهای مدرن
                    </h2>
                    <p className="text-sm leading-7 text-muted-foreground">
                      تمرکز من روی ساخت تجربه‌های دیجیتال خوش‌ساخت است؛ جایی که
                      زیبایی بصری، عملکرد و هویت برند در یک مسیر قرار می‌گیرند.
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                      <div className="text-2xl font-semibold">3+</div>
                      <div className="text-sm text-muted-foreground">Years</div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                      <div className="text-2xl font-semibold">24</div>
                      <div className="text-sm text-muted-foreground">
                        Projects
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[22rem] bg-gradient-to-br from-primary/15 via-background to-background">
                  <div className="absolute inset-0 flex items-end justify-center p-6">
                    <div className="w-full rounded-[1.75rem] border border-border/60 bg-background/80 p-4 shadow-lg backdrop-blur-sm">
                      <div className="aspect-[4/5] rounded-[1.5rem] border border-dashed border-border/60 bg-gradient-to-b from-primary/20 via-background to-background">
                        <div className="flex h-full items-center justify-center p-6 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Portrait / Artwork
                            </p>
                            <p className="mt-2 text-lg font-medium">
                              اینجا می‌تواند تصویر پروفایل یا آرت‌ورک قرار بگیرد
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
