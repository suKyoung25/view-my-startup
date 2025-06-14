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
  },
  {
    name: "스마트에듀",
    description: "스마트에듀는 성장 중인 솔루션 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 161.0,
    revenue: 32.0,
    numberOfEmployees: 150,
  },
  {
    name: "핀캐시",
    description: "핀캐시는 성장 중인 서비스 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 140.0,
    revenue: 35.0,
    numberOfEmployees: 185,
  },
  {
    name: "컬리하우스",
    description: "컬리하우스는 혁신적인 서비스 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 167.0,
    revenue: 77.0,
    numberOfEmployees: 272,
  },
  {
    name: "라이프핏",
    description: "라이프핏는 혁신적인 서비스 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 136.0,
    revenue: 22.0,
    numberOfEmployees: 66,
  },
  {
    name: "마켓컬리",
    description: "마켓컬리는 고속 성장 중인 기술 기반 기업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 24.0,
    revenue: 53.0,
    numberOfEmployees: 188,
  },
  {
    name: "토스",
    description: "토스는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "프롭테크",
    realInvestmentAmount: 9.0,
    revenue: 47.0,
    numberOfEmployees: 146,
  },
  {
    name: "배달의민족",
    description: "배달의민족는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "핀테크",
    realInvestmentAmount: 111.0,
    revenue: 19.0,
    numberOfEmployees: 88,
  },
  {
    name: "야놀자",
    description: "야놀자는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 53.0,
    revenue: 27.0,
    numberOfEmployees: 58,
  },
  {
    name: "무신사",
    description: "무신사는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 109.0,
    revenue: 37.0,
    numberOfEmployees: 220,
  },
  {
    name: "직방",
    description: "직방는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "헬스케어",
    realInvestmentAmount: 73.0,
    revenue: 57.0,
    numberOfEmployees: 78,
  },
  {
    name: "리디북스",
    description: "리디북스는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 95.0,
    revenue: 16.0,
    numberOfEmployees: 256,
  },
  {
    name: "당근마켓",
    description: "당근마켓는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 15.0,
    revenue: 86.0,
    numberOfEmployees: 166,
  },
  {
    name: "크림",
    description: "크림는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "AI",
    realInvestmentAmount: 53.0,
    revenue: 56.0,
    numberOfEmployees: 159,
  },
  {
    name: "왓챠",
    description: "왓챠는 고속 성장 중인 기술 기반 기업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 76.0,
    revenue: 81.0,
    numberOfEmployees: 115,
  },
  {
    name: "클래스101",
    description: "클래스101는 고속 성장 중인 기술 기반 기업입니다.",
    category: "AI",
    realInvestmentAmount: 82.0,
    revenue: 31.0,
    numberOfEmployees: 133,
  },
  {
    name: "비바리퍼블리카",
    description: "비바리퍼블리카는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "바이오",
    realInvestmentAmount: 121.0,
    revenue: 62.0,
    numberOfEmployees: 231,
  },
  {
    name: "리멤버",
    description: "리멤버는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "소셜임팩트",
    realInvestmentAmount: 92.0,
    revenue: 48.0,
    numberOfEmployees: 44,
  },
  {
    name: "컬리",
    description: "컬리는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "프롭테크",
    realInvestmentAmount: 128.0,
    revenue: 89.0,
    numberOfEmployees: 122,
  },
  {
    name: "루닛",
    description: "루닛는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "헬스케어",
    realInvestmentAmount: 93.0,
    revenue: 62.0,
    numberOfEmployees: 158,
  },
  {
    name: "업스테이지",
    description: "업스테이지는 고속 성장 중인 기술 기반 기업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 88.0,
    revenue: 92.0,
    numberOfEmployees: 57,
  },
  {
    name: "아크릴",
    description: "아크릴는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 13.0,
    revenue: 14.0,
    numberOfEmployees: 50,
  },
  {
    name: "센드버드",
    description: "센드버드는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 64.0,
    revenue: 49.0,
    numberOfEmployees: 78,
  },
  {
    name: "마인즈랩",
    description: "마인즈랩는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "바이오",
    realInvestmentAmount: 24.0,
    revenue: 11.0,
    numberOfEmployees: 40,
  },
  {
    name: "뷰노",
    description: "뷰노는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 5.0,
    revenue: 63.0,
    numberOfEmployees: 202,
  },
  {
    name: "오늘의집",
    description: "오늘의집는 고속 성장 중인 기술 기반 기업입니다.",
    category: "바이오",
    realInvestmentAmount: 108.0,
    revenue: 81.0,
    numberOfEmployees: 176,
  },
  {
    name: "뱅크샐러드",
    description: "뱅크샐러드는 고속 성장 중인 기술 기반 기업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 11.0,
    revenue: 2.0,
    numberOfEmployees: 186,
  },
  {
    name: "클래스카드",
    description: "클래스카드는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 23.0,
    revenue: 93.0,
    numberOfEmployees: 260,
  },
  {
    name: "윌라",
    description: "윌라는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "모빌리티",
    realInvestmentAmount: 127.0,
    revenue: 13.0,
    numberOfEmployees: 153,
  },
  {
    name: "그렙",
    description: "그렙는 고속 성장 중인 기술 기반 기업입니다.",
    category: "소셜임팩트",
    realInvestmentAmount: 103.0,
    revenue: 77.0,
    numberOfEmployees: 267,
  },
  {
    name: "에듀윌",
    description: "에듀윌는 고속 성장 중인 기술 기반 기업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 76.0,
    revenue: 16.0,
    numberOfEmployees: 61,
  },
  {
    name: "코멘토",
    description: "코멘토는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 55.0,
    revenue: 19.0,
    numberOfEmployees: 68,
  },
  {
    name: "프립",
    description: "프립는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 89.0,
    revenue: 63.0,
    numberOfEmployees: 171,
  },
  {
    name: "버즈빌",
    description: "버즈빌는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 39.0,
    revenue: 10.0,
    numberOfEmployees: 59,
  },
  {
    name: "직토",
    description: "직토는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "프롭테크",
    realInvestmentAmount: 75.0,
    revenue: 52.0,
    numberOfEmployees: 167,
  },
  {
    name: "에이블리",
    description: "에이블리는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 47.0,
    revenue: 78.0,
    numberOfEmployees: 279,
  },
  {
    name: "지그재그",
    description: "지그재그는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 49.0,
    revenue: 61.0,
    numberOfEmployees: 156,
  },
  {
    name: "리디",
    description: "리디는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "모빌리티",
    realInvestmentAmount: 78.0,
    revenue: 69.0,
    numberOfEmployees: 276,
  },
  {
    name: "밀리의서재",
    description: "밀리의서재는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "프롭테크",
    realInvestmentAmount: 30.0,
    revenue: 14.0,
    numberOfEmployees: 214,
  },
  {
    name: "트레바리",
    description: "트레바리는 고객 중심의 솔루션을 제공하고 있습니다.",
    category: "모빌리티",
    realInvestmentAmount: 123.0,
    revenue: 16.0,
    numberOfEmployees: 52,
  },
  {
    name: "오르카",
    description: "오르카는 글로벌 진출을 목표로 하는 한국 스타트업입니다.",
    category: "바이오",
    realInvestmentAmount: 40.0,
    revenue: 99.0,
    numberOfEmployees: 276,
  },
  {
    name: "패스트캠퍼스",
    description: "패스트캠퍼스는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 122.0,
    revenue: 93.0,
    numberOfEmployees: 202,
  },
  {
    name: "넥스트유니콘",
    description: "넥스트유니콘는 차세대 기술로 시장을 선도하는 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 149.0,
    revenue: 71.0,
    numberOfEmployees: 298,
  },
  {
    name: "채널톡",
    description: "채널톡는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 48.0,
    revenue: 48.0,
    numberOfEmployees: 98,
  },
  {
    name: "로앤컴퍼니",
    description: "로앤컴퍼니는 혁신적인 서비스를 제공하는 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 136.0,
    revenue: 27.0,
    numberOfEmployees: 168,
  },
  {
    name: "브랜디",
    description: "브랜디는 패션 커머스 플랫폼으로 성장 중인 스타트업입니다.",
    category: "라이프스타일",
    realInvestmentAmount: 87.0,
    revenue: 33.0,
    numberOfEmployees: 142,
  },
  {
    name: "하이퍼리즘",
    description:
      "하이퍼리즘은 디지털 자산 투자 솔루션을 제공하는 스타트업입니다.",
    category: "핀테크",
    realInvestmentAmount: 68.0,
    revenue: 21.0,
    numberOfEmployees: 87,
  },
  {
    name: "루센트블록",
    description:
      "루센트블록은 블록체인 기반 문서 인증 서비스를 제공하는 스타트업입니다.",
    category: "AI",
    realInvestmentAmount: 31.0,
    revenue: 12.0,
    numberOfEmployees: 41,
  },
  {
    name: "비트바이트",
    description:
      "비트바이트는 데이터 분석 및 자동화 플랫폼을 제공하는 스타트업입니다.",
    category: "에듀테크",
    realInvestmentAmount: 56.0,
    revenue: 27.0,
    numberOfEmployees: 73,
  },
  {
    name: "에이슬립",
    description:
      "에이슬립은 수면 개선 솔루션을 개발하는 헬스케어 스타트업입니다.",
    category: "헬스케어",
    realInvestmentAmount: 44.0,
    revenue: 19.0,
    numberOfEmployees: 39,
  },
];

async function main() {
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
