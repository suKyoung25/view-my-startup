const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const companies = [
  {
    name: "넥스트코어",
    description: "넥스트코어는 성장 중인 플랫폼 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 52.0,
    revenue: 76.0,
    numberOfEmployees: 53,
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple115/v4/8c/11/cc/8c11ccca-c2f8-64f8-4ff7-757b8d7f245a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png",
  },
  {
    name: "스마트에듀",
    description: "스마트에듀는 성장 중인 솔루션 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 161.0,
    revenue: 32.0,
    numberOfEmployees: 150,
    imageUrl:
      "https://img.freepik.com/premium-vector/smart-logo-initial-letter-s_8589-633.jpg",
  },
  {
    name: "핀캐시",
    description: "핀캐시는 성장 중인 서비스 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 140.0,
    revenue: 35.0,
    numberOfEmployees: 185,
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/13/94/dc/1394dc67-8721-3518-15d8-72f2fd0fdea4/AppIcon-0-1x_U007emarketing-0-0-85-220-0-6.png/1200x630wa.png",
  },
  {
    name: "컬리하우스",
    description:
      "컬리하우스는 혁신적인 서비스를 통해 시장의 변화를 선도하는 스타트업입니다. 사용자 중심의 솔루션을 개발하며 빠르게 성장하고 있습니다. 기술과 창의성을 바탕으로 새로운 가치를 창출하고 있습니다.",
    category: "에듀테크",
    realInvestmentAmount: 167.0,
    revenue: 77.0,
    numberOfEmployees: 272,
    imageUrl:
      "https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg",
  },
  {
    name: "라이프핏",
    description: "라이프핏은 혁신적인 서비스 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 136.0,
    revenue: 22.0,
    numberOfEmployees: 66,
    imageUrl:
      "https://th.bing.com/th/id/OIP.2RI-Ff-rUArY7OQ9jTq0jwHaHa?w=156&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "마켓컬리",
    description: "마켓컬리는 고속 성장 중인 기술 기반 기업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 24.0,
    revenue: 53.0,
    numberOfEmployees: 188,
    imageUrl:
      "https://th.bing.com/th/id/OIP.kckhMffC1klJQF8luKtxZwHaEP?w=259&h=181&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "토스",
    description: "토스는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "프롭테크",
    realInvestmentAmount: 9.0,
    revenue: 47.0,
    numberOfEmployees: 146,
    imageUrl:
      "https://th.bing.com/th/id/OIP.6LpVPlE6fsGx7OJOFwkObQHaFE?w=259&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "배달의민족",
    description: "배달의민족은 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "핀테크",
    realInvestmentAmount: 111.0,
    revenue: 19.0,
    numberOfEmployees: 88,
    imageUrl:
      "https://th.bing.com/th/id/OIP.y6rFkbXWDvorf2VJyhtRdQAAAA?w=164&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "야놀자",
    description: "야놀자는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 53.0,
    revenue: 27.0,
    numberOfEmployees: 58,
    imageUrl:
      "https://th.bing.com/th/id/OIP.TqETBHJeI9cxcl2T2l0CBwHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "무신사",
    description: "무신사는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 109.0,
    revenue: 37.0,
    numberOfEmployees: 220,
    imageUrl:
      "https://th.bing.com/th/id/OIP.D2S0ZdgbRlB9nekb9iZobAHaHa?w=197&h=196&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "직방",
    description: "직방은 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "헬스케어",
    realInvestmentAmount: 73.0,
    revenue: 57.0,
    numberOfEmployees: 78,
    imageUrl:
      "https://th.bing.com/th/id/OIP.BbbFSlHeB2SWKjrjsp7UcwHaIA?w=156&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "리디북스",
    description: "리디북스는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 95.0,
    revenue: 16.0,
    numberOfEmployees: 256,
    imageUrl:
      "https://ridicorp.com/wp-content/themes/ridicorp/images/blog/img/2017-04-28/ridibooks-app-icon.png",
  },
  {
    name: "당근마켓",
    description: "당근마켓은 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 15.0,
    revenue: 86.0,
    numberOfEmployees: 166,
    imageUrl:
      "https://th.bing.com/th/id/OIP.gv2uZpdYR1RbRK4YeIfYfQHaF7?w=250&h=199&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "크림",
    description: "크림은 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "AI",
    realInvestmentAmount: 53.0,
    revenue: 56.0,
    numberOfEmployees: 159,
    imageUrl:
      "https://th.bing.com/th/id/OIP.NQLc5N31ER1xZQ6CfpEAmgHaHa?w=168&h=181&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "왓챠",
    description: "왓챠는 고속 성장 중인 기술 기반 기업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 76.0,
    revenue: 81.0,
    numberOfEmployees: 115,
    imageUrl:
      "https://th.bing.com/th/id/OIP.4lLCNJ28QkuZoW1Il6TTsgAAAA?w=157&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "클래스101",
    description: "클래스101는 고속 성장 중인 기술 기반 기업입니다.",
    category: "AI",
    realInvestmentAmount: 82.0,
    revenue: 31.0,
    numberOfEmployees: 133,
    imageUrl:
      "https://cdn.class101.net/images/fe529fa4-e806-46f2-a9e7-a221a8594a3f",
  },
  {
    name: "비바리퍼블리카",
    description: "비바리퍼블리카는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "바이오",
    realInvestmentAmount: 121.0,
    revenue: 62.0,
    numberOfEmployees: 231,
    imageUrl: "https://images.roa.ai/company_logo/pGwwgD8W.png",
  },
  {
    name: "리멤버",
    description: "리멤버는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "소셜임팩트",
    realInvestmentAmount: 92.0,
    revenue: 48.0,
    numberOfEmployees: 44,
    imageUrl:
      "https://th.bing.com/th/id/OIP.bLUgO82UXa_WkdPHesPt2wAAAA?w=150&h=150&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "컬리",
    description: "컬리는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "프롭테크",
    realInvestmentAmount: 128.0,
    revenue: 89.0,
    numberOfEmployees: 122,
    imageUrl:
      "https://th.bing.com/th/id/OIP.jo2tlAmDhR-rDnWgac0LrQHaEp?w=266&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "루닛",
    description: "루닛은 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "헬스케어",
    realInvestmentAmount: 93.0,
    revenue: 62.0,
    numberOfEmployees: 158,
    imageUrl:
      "https://th.bing.com/th/id/OIP.mlT6kbv0LoqsmNpZ19W2aAHaE6?w=244&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "업스테이지",
    description: "업스테이지는 고속 성장 중인 기술 기반 기업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 88.0,
    revenue: 92.0,
    numberOfEmployees: 57,
    imageUrl:
      "https://th.bing.com/th/id/OIP.e2i6m8-BmcKu5Qn-HmViugHaBm?w=309&h=75&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "아크릴",
    description: "아크릴은 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 13.0,
    revenue: 14.0,
    numberOfEmployees: 50,
    imageUrl:
      "https://th.bing.com/th/id/OIP._vom-zibZfTvFR1xxqjybAAAAA?w=186&h=186&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "센드버드",
    description: "센드버드는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 64.0,
    revenue: 49.0,
    numberOfEmployees: 78,
    imageUrl:
      "https://th.bing.com/th/id/OIP.PdFSNXsxpZ7b5-J0uqWZDwAAAA?w=150&h=150&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "마인즈랩",
    description: "마인즈랩은 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "바이오",
    realInvestmentAmount: 24.0,
    revenue: 11.0,
    numberOfEmployees: 40,
    imageUrl:
      "https://th.bing.com/th/id/OIP.x9rC0lGeuxOIFzgDQrbM4wHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "뷰노",
    description: "뷰노는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 5.0,
    revenue: 63.0,
    numberOfEmployees: 202,
    imageUrl:
      "https://th.bing.com/th/id/OIP.atZGAuCls-QpsQVXYU1Z1AAAAA?w=156&h=169&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "오늘의집",
    description: "오늘의집은 고속 성장 중인 기술 기반 기업입니다.",
    category: "바이오",
    realInvestmentAmount: 108.0,
    revenue: 81.0,
    numberOfEmployees: 176,
    imageUrl:
      "https://th.bing.com/th/id/OIP.Any5T_qtn4hIqgkl_ByfagAAAA?w=156&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "뱅크샐러드",
    description: "뱅크샐러드는 고속 성장 중인 기술 기반 기업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 11.0,
    revenue: 2.0,
    numberOfEmployees: 186,
    imageUrl:
      "https://th.bing.com/th/id/OIP.UrbtOTnM8uzfMG2DOMdHdQAAAA?w=199&h=188&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "클래스카드",
    description: "클래스카드는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 23.0,
    revenue: 93.0,
    numberOfEmployees: 260,
    imageUrl:
      "https://th.bing.com/th/id/OIP.z7om6mEGg3gTDQCqFuK9ggHaHa?w=178&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "윌라",
    description: "윌라는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "모빌리티",
    realInvestmentAmount: 127.0,
    revenue: 13.0,
    numberOfEmployees: 153,
    imageUrl:
      "https://th.bing.com/th/id/OIP.CSkXYS98u9ALtulIv5afOAHaFh?w=238&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "그렙",
    description: "그렙은 고속 성장 중인 기술 기반 기업입니다.",
    category: "소셜임팩트",
    realInvestmentAmount: 103.0,
    revenue: 77.0,
    numberOfEmployees: 267,
    imageUrl:
      "https://th.bing.com/th/id/OIP.pcZi46GVbywjqB1qRLueAwHaHa?w=218&h=218&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "에듀윌",
    description: "에듀윌은 고속 성장 중인 기술 기반 기업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 76.0,
    revenue: 16.0,
    numberOfEmployees: 61,
    imageUrl:
      "https://th.bing.com/th/id/OIP.jnLkZvN6M3Rdec0m474eRwHaHa?w=196&h=196&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "코멘토",
    description: "코멘토는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 55.0,
    revenue: 19.0,
    numberOfEmployees: 68,
    imageUrl:
      "https://th.bing.com/th/id/OIP.tjefxuJX9rB_MkrAQPl08wHaD4?w=340&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "프립",
    description: "프립은 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 89.0,
    revenue: 63.0,
    numberOfEmployees: 171,
    imageUrl:
      "https://th.bing.com/th/id/OIP.ku179I1Ce0l_A1NSJghWlQHaD4?w=294&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "버즈빌",
    description: "버즈빌은 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 39.0,
    revenue: 10.0,
    numberOfEmployees: 59,
    imageUrl:
      "https://th.bing.com/th/id/OIP.bXPO_i6wRVDWja1EHbfldgAAAA?w=150&h=150&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "직토",
    description: "직토는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "프롭테크",
    realInvestmentAmount: 75.0,
    revenue: 52.0,
    numberOfEmployees: 167,
    imageUrl:
      "https://th.bing.com/th/id/OIP.PJCGKMKp1nfhuKmtImRetwAAAA?w=156&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "에이블리",
    description: "에이블리는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 47.0,
    revenue: 78.0,
    numberOfEmployees: 279,
    imageUrl:
      "https://th.bing.com/th/id/OIP.wRTY1_uOVcw1xTMzFTIa4gHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "지그재그",
    description: "지그재그는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 49.0,
    revenue: 61.0,
    numberOfEmployees: 156,
    imageUrl:
      "https://th.bing.com/th/id/OIP.jW9jdCeP8haILGEp7kPXgQHaHa?w=170&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "리디",
    description: "리디는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "모빌리티",
    realInvestmentAmount: 78.0,
    revenue: 69.0,
    numberOfEmployees: 276,
    imageUrl:
      "https://th.bing.com/th/id/OIP.NSguYPTg4t_bplhU5-u_ugHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "밀리의서재",
    description: "밀리의서재는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "프롭테크",
    realInvestmentAmount: 30.0,
    revenue: 14.0,
    numberOfEmployees: 214,
    imageUrl:
      "https://th.bing.com/th/id/OIP.eH9cXA-Atf-S-vrFR9u0-QHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "트레바리",
    description: "트레바리는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "모빌리티",
    realInvestmentAmount: 123.0,
    revenue: 16.0,
    numberOfEmployees: 52,
    imageUrl:
      "https://th.bing.com/th/id/OIP.QrxFXEbUMLXEIMiFSx7aKQAAAA?w=162&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "오르카",
    description: "오르카는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "바이오",
    realInvestmentAmount: 40.0,
    revenue: 99.0,
    numberOfEmployees: 276,
    imageUrl:
      "https://th.bing.com/th/id/OIP.KU0MDQYBAN3qOnEdrjB15gHaHa?w=156&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "패스트캠퍼스",
    description: "패스트캠퍼스는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 122.0,
    revenue: 93.0,
    numberOfEmployees: 202,
    imageUrl:
      "https://th.bing.com/th/id/OIP.Smg0WAJnA44i-_v7Uqu3swHaHa?w=158&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "넥스트유니콘",
    description:
      "넥스트유니콘은 차세대 기술로 시장을 선도하는 최고의 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 149.0,
    revenue: 71.0,
    numberOfEmployees: 298,
    imageUrl:
      "https://th.bing.com/th/id/OIP.hEYb0ck_cqjzrVW3hpMV2QHaHa?w=167&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "채널톡",
    description: "채널톡은 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 48.0,
    revenue: 48.0,
    numberOfEmployees: 98,
    imageUrl:
      "https://th.bing.com/th/id/OIP.RjNLCFhH31eCUUUm5D_Z5AAAAA?w=156&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "로앤컴퍼니",
    description: "로앤컴퍼니는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 136.0,
    revenue: 27.0,
    numberOfEmployees: 168,
    imageUrl:
      "https://th.bing.com/th/id/OIP.1k9OEVIKaBXkZgPT-nY6aAHaHa?w=167&h=185&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "브랜디",
    description: "브랜디는 패션 커머스 플랫폼으로 성장 중인 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 87.0,
    revenue: 33.0,
    numberOfEmployees: 142,
    imageUrl:
      "https://th.bing.com/th/id/OIP.Eo-Ldphk8el2yVaqMjcnUwAAAA?w=202&h=195&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "하이퍼리즘",
    description:
      "하이퍼리즘은 디지털 자산 투자 솔루션을 제공하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 68.0,
    revenue: 21.0,
    numberOfEmployees: 87,
    imageUrl:
      "https://th.bing.com/th/id/OIP.v_3dqhdO6F0jlWZ11hNUXgHaEW?w=301&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "루센트블록",
    description:
      "루센트블록은 블록체인 기반 문서 인증 서비스를 제공하는 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 31.0,
    revenue: 12.0,
    numberOfEmployees: 41,
    imageUrl:
      "https://th.bing.com/th/id/OIP.bMjcM8wn8ME5o2SPLdvcfgAAAA?w=150&h=150&c=7&r=0&o=5&pid=1.7",
  },
  {
    name: "비트바이트",
    description:
      "비트바이트는 데이터 분석 및 자동화 플랫폼을 제공하는 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 56.0,
    revenue: 27.0,
    numberOfEmployees: 73,
    imageUrl:
      "https://th.bing.com/th/id/OIP.sLPJCXv0Oh9Bz7zmy_eLngHaHa?rs=1&pid=ImgDetMain",
  },
  {
    name: "에이슬립",
    description:
      "에이슬립은 수면 개선 솔루션을 개발하는 헬스케어 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 44.0,
    revenue: 19.0,
    numberOfEmployees: 39,
    imageUrl:
      "https://th.bing.com/th/id/OIP.pkcIbvnMxxSdwLGfbmorfQAAAA?w=150&h=150&c=7&r=0&o=5&pid=1.7",
  },
];

async function main() {
  // 참조하는 테이블부터 삭제
  await prisma.investment.deleteMany();

  await prisma.company.deleteMany(); // 기존 데이터 삭제

  await prisma.company.createMany({
    data: companies,
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
