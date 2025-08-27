"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InfoIcon,
  Eye,
  Share,
  Network,
  Twitter,
  Github,
  MessageCircle,
  Wallet,
  Globe,
  BookOpen,
  Users,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ReputationData {
  atoms: number
  triples: number
  claims: number
  upvoteClaims: number
  downvoteClaims: number
  tags: string[]
  circleScore: number
  profilePicture: string
  ensName?: string
  socialLinks: {
    twitter?: string
    discord?: string
    github?: string
    website?: string
    medium?: string
    telegram?: string
    linkedin?: string
  }
  circleMemberPfps: string[]
}

interface CircleMember {
  name: string
  pfp: string
  trustPercentage: number
  ensName?: string
}

interface ConnectedWallet {
  address: string
  ensName?: string
  pfp: string
}

export default function WalletReputationChecker() {
  const [walletAddress, setWalletAddress] = useState("")
  const [reputationData, setReputationData] = useState<ReputationData | null>(null)
  const [userTrustRating, setUserTrustRating] = useState([50])
  const [isLoading, setIsLoading] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null)
  const [showConnections, setShowConnections] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [circleMembers, setCircleMembers] = useState<CircleMember[]>([])

  const mockTags = [
    "NFT Collector",
    "DAO Voter",
    "DeFi User",
    "Early Adopter",
    "Community Builder",
    "Whale",
    "Active Trader",
    "Long-term Holder",
    "Protocol Contributor",
    "Governance Participant",
  ]

  const mockSocialHandles = [
    {
      twitter: "cryptowhale",
      discord: "whale#1234",
      github: "cryptodev",
      website: "myportfolio.xyz",
      medium: "cryptowhale",
      telegram: "cryptowhale_official",
      linkedin: "crypto-whale",
    },
    {
      twitter: "nftcollector",
      discord: "collector#5678",
      github: "nftbuilder",
      medium: "nftcollector",
      telegram: "nft_collector",
    },
    {
      twitter: "daovoter",
      discord: "voter#9012",
      website: "mydao.org",
      medium: "daovoter",
      linkedin: "dao-voter",
    },
    {
      twitter: "defiuser",
      github: "defidev",
      website: "defi.app",
      medium: "defiuser",
      telegram: "defi_user",
    },
    {
      discord: "builder#3456",
      github: "web3builder",
      website: "builder.eth",
      medium: "web3builder",
      linkedin: "web3-builder",
    },
  ]

  const mockProfilePictures = [
    "/crypto-avatar-purple.png",
    "/nft-profile-blue.png",
    "/dao-member-green.png",
    "/defi-user-orange.png",
    "/web3-builder-pink.png",
  ]

  const mockEnsNames = ["cryptowhale.eth", "nftcollector.eth", "daovoter.eth", "defiuser.eth", "web3builder.eth"]

  const mockCircleMembers: CircleMember[] = [
    { name: "alice.eth", pfp: "/crypto-avatar-purple.png", trustPercentage: 95, ensName: "alice.eth" },
    { name: "bob.eth", pfp: "/nft-profile-blue.png", trustPercentage: 87, ensName: "bob.eth" },
    { name: "charlie.eth", pfp: "/dao-member-green.png", trustPercentage: 92 },
    { name: "diana.eth", pfp: "/defi-user-orange.png", trustPercentage: 78, ensName: "diana.eth" },
    { name: "eve.eth", pfp: "/web3-builder-pink.png", ensName: "eve.eth" },
    { name: "frank.eth", pfp: "/crypto-avatar-purple.png", trustPercentage: 89, ensName: "frank.eth" },
    { name: "grace.eth", pfp: "/nft-profile-blue.png", ensName: "grace.eth" },
    { name: "henry.eth", pfp: "/dao-member-green.png", ensName: "henry.eth" },
    { name: "iris.eth", pfp: "/defi-user-orange.png", ensName: "iris.eth" },
    { name: "jack.eth", pfp: "/web3-builder-pink.png", ensName: "jack.eth" },
    { name: "kate.eth", pfp: "/crypto-avatar-purple.png", ensName: "kate.eth" },
    { name: "liam.eth", pfp: "/nft-profile-blue.png", ensName: "liam.eth" },
  ]

  const generateMockCircleMembers = (searchedWallet: string): CircleMember[] => {
    const baseMembers = [
      { name: "alice.eth", pfp: "/crypto-avatar-purple.png", ensName: "alice.eth" },
      { name: "bob.eth", pfp: "/nft-profile-blue.png", ensName: "bob.eth" },
      { name: "charlie.eth", pfp: "/dao-member-green.png", ensName: "charlie.eth" },
      { name: "diana.eth", pfp: "/defi-user-orange.png", ensName: "charlie.eth" },
      { name: "eve.eth", pfp: "/web3-builder-pink.png", ensName: "eve.eth" },
      { name: "frank.eth", pfp: "/crypto-avatar-purple.png", ensName: "frank.eth" },
      { name: "grace.eth", pfp: "/nft-profile-blue.png", ensName: "grace.eth" },
      { name: "henry.eth", pfp: "/dao-member-green.png", ensName: "henry.eth" },
      { name: "iris.eth", pfp: "/defi-user-orange.png", ensName: "iris.eth" },
      { name: "jack.eth", pfp: "/web3-builder-pink.png", ensName: "jack.eth" },
      { name: "kate.eth", pfp: "/crypto-avatar-purple.png", ensName: "kate.eth" },
      { name: "liam.eth", pfp: "/nft-profile-blue.png", ensName: "liam.eth" },
    ]

    return baseMembers
      .map((member) => ({
        ...member,
        trustPercentage: Math.floor(Math.random() * 40) + 60, // Random trust between 60-100%
      }))
      .sort((a, b) => b.trustPercentage - a.trustPercentage) // Sort by trust percentage descending
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleWalletConnect = () => {
    const mockWallet: ConnectedWallet = {
      address: "0x742d35Cc6634C0532925a3b8D4C9db96590e4265",
      ensName: "mywalletname.eth",
      pfp: "/crypto-avatar-purple.png",
    }
    setConnectedWallet(mockWallet)
    console.log("Wallet connected:", mockWallet)
  }

  const handleCheckReputation = async () => {
    if (!walletAddress.trim()) return

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const randomSocial = mockSocialHandles[Math.floor(Math.random() * mockSocialHandles.length)]
    const randomPicture = mockProfilePictures[Math.floor(Math.random() * mockProfilePictures.length)]
    const randomEns = mockEnsNames[Math.floor(Math.random() * mockEnsNames.length)]

    const circleMemberPfps = Array.from(
      { length: 5 },
      () => mockProfilePictures[Math.floor(Math.random() * mockProfilePictures.length)],
    )

    const mockData: ReputationData = {
      atoms: Math.floor(Math.random() * 500) + 10,
      triples: Math.floor(Math.random() * 300) + 5,
      claims: Math.floor(Math.random() * 200) + 5,
      upvoteClaims: Math.floor(Math.random() * 150) + 2,
      downvoteClaims: Math.floor(Math.random() * 50) + 1,
      tags: mockTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 4),
      circleScore: Math.floor(Math.random() * 100),
      profilePicture: randomPicture,
      ensName: Math.random() > 0.3 ? randomEns : undefined,
      socialLinks: randomSocial,
      circleMemberPfps,
    }

    setReputationData(mockData)
    setIsLoading(false)
  }

  const handleShareTrustRating = () => {
    setShowShareModal(true)
  }

  const handleExploreConnections = () => {
    const dynamicCircleMembers = generateMockCircleMembers(walletAddress)
    setCircleMembers(dynamicCircleMembers)
    setShowConnections(true)
  }

  const handleSubmitTrustRating = () => {
    console.log(`Submitting trust rating: ${userTrustRating[0]}% for wallet: ${walletAddress}`)
    alert(`Trust rating of ${userTrustRating[0]}% submitted to the Knowledge Graph!`)
  }

  return (
    <TooltipProvider>
      <div
        className="min-h-screen p-4 bg-black relative"
        style={{
          backgroundImage: "url('/intuition-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        <div className="relative z-10">
          <div className="w-full max-w-6xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-purple-400" />
                <h1 className="text-2xl font-bold text-white hidden md:block">TRUST CHECKER</h1>
              </div>
              <Button
                onClick={handleWalletConnect}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-gray-900/50"
              >
                {connectedWallet ? (
                  <span className="flex items-center gap-2">
                    <img
                      src={connectedWallet.pfp || "/placeholder.svg"}
                      alt="Wallet"
                      className="w-5 h-5 rounded-full"
                    />
                    {connectedWallet.ensName ||
                      `${connectedWallet.address.slice(0, 6)}...${connectedWallet.address.slice(-4)}`}
                  </span>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl space-y-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Eye className="w-8 h-8 text-purple-400" />
                  <h1 className="text-4xl font-bold text-white hidden md:block">TRUST CHECKER</h1>
                </div>
                <p className="text-gray-400 text-lg">
                  Discover trust scores and reputation data from the Intuition Knowledge Graph
                </p>
              </div>

              <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Enter Wallet Address</CardTitle>
                  <CardDescription className="text-gray-400">
                    Paste any Ethereum wallet address to check its reputation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590e4265"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-500"
                    />
                    <Button
                      onClick={handleCheckReputation}
                      disabled={!walletAddress.trim() || isLoading}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                    >
                      {isLoading ? "Checking..." : "Check Reputation"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {reputationData && (
                <div className="space-y-6">
                  <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={reputationData.profilePicture || "/placeholder.svg"}
                            alt="Wallet Profile"
                            className="w-20 h-20 rounded-full border-2 border-gray-700/50"
                          />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-xl font-bold text-white mb-2">Wallet Profile</h3>
                          {reputationData.ensName && (
                            <p className="text-gray-300 text-lg font-medium mb-1">{reputationData.ensName}</p>
                          )}
                          <p className="text-gray-400 text-sm mb-3 font-mono">{truncateAddress(walletAddress)}</p>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            {reputationData.socialLinks.twitter && (
                              <a
                                href={`https://twitter.com/${reputationData.socialLinks.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <Twitter className="w-4 h-4" />
                                <span className="text-sm">@{reputationData.socialLinks.twitter}</span>
                              </a>
                            )}
                            {reputationData.socialLinks.github && (
                              <a
                                href={`https://github.com/${reputationData.socialLinks.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-gray-400 hover:text-gray-300 transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                <span className="text-sm">{reputationData.socialLinks.github}</span>
                              </a>
                            )}
                            {reputationData.socialLinks.medium && (
                              <a
                                href={`https://medium.com/@${reputationData.socialLinks.medium}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                              >
                                <BookOpen className="w-4 h-4" />
                                <span className="text-sm">{reputationData.socialLinks.medium}</span>
                              </a>
                            )}
                            {reputationData.socialLinks.discord && (
                              <div className="flex items-center gap-1 text-purple-400">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{reputationData.socialLinks.discord}</span>
                              </div>
                            )}
                            {reputationData.socialLinks.telegram && (
                              <a
                                href={`https://t.me/${reputationData.socialLinks.telegram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                              >
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{reputationData.socialLinks.telegram}</span>
                              </a>
                            )}
                            {reputationData.socialLinks.website && (
                              <a
                                href={`https://${reputationData.socialLinks.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
                              >
                                <Globe className="w-4 h-4" />
                                <span className="text-sm">{reputationData.socialLinks.website}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Eye className="w-5 h-5 text-purple-400" />
                        Reputation Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-orange-500/20">
                          <div className="text-3xl font-bold text-orange-400">{reputationData.atoms}</div>
                          <div className="text-sm text-orange-200">Atoms</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-yellow-500/20">
                          <div className="text-3xl font-bold text-yellow-400">{reputationData.triples}</div>
                          <div className="text-sm text-yellow-200">Triples</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-blue-500/20">
                          <div className="text-3xl font-bold text-blue-400">{reputationData.claims}</div>
                          <div className="text-sm text-blue-200">Claims</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
                          <div className="text-3xl font-bold text-green-400">{reputationData.upvoteClaims}</div>
                          <div className="text-sm text-green-200">Upvote Claims</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-red-500/20">
                          <div className="text-3xl font-bold text-red-400">{reputationData.downvoteClaims}</div>
                          <div className="text-sm text-red-200">Downvote Claims</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-3">Tags</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {reputationData.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-gray-800/50 text-gray-300 border-gray-600/50 text-center justify-center"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Circle Trust Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-gray-300 font-medium">Your Circle Score</h4>
                            <Tooltip>
                              <TooltipTrigger>
                                <InfoIcon className="w-4 h-4 text-purple-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Your Circle Score is calculated from people you trust and their direct connections.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Progress value={reputationData.circleScore} className="h-3 bg-gray-800" />
                          <div className="text-3xl font-bold text-purple-400">{reputationData.circleScore}%</div>
                        </div>

                        <div className="flex-shrink-0 ml-8">
                          <h5 className="text-gray-300 text-sm font-medium mb-3">Circle Members</h5>
                          <div className="flex -space-x-2">
                            {reputationData.circleMemberPfps.map((pfp, index) => (
                              <img
                                key={index}
                                src={pfp || "/placeholder.svg"}
                                alt={`Circle member ${index + 1}`}
                                className="w-10 h-10 rounded-full border-2 border-gray-800 hover:z-10 relative transition-transform hover:scale-110"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Rate Your Trust</CardTitle>
                      <CardDescription className="text-gray-400">
                        How much do you trust this wallet? Your rating contributes to the Knowledge Graph.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <Slider
                          value={userTrustRating}
                          onValueChange={setUserTrustRating}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-center">
                          <span className="text-2xl font-bold text-purple-400">{userTrustRating[0]}%</span>
                        </div>
                        <Button
                          onClick={handleSubmitTrustRating}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          Submit Rating to Knowledge Graph
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                          <Share className="w-4 h-4 mr-2" />
                          Share Your Trust Rating
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700/50 text-white">
                        <DialogHeader>
                          <DialogTitle>Share Trust Rating</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Summary of reputation and your trust rating
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={reputationData.profilePicture || "/placeholder.svg"}
                              alt="Profile"
                              className="w-16 h-16 rounded-full border-2 border-gray-700/50"
                            />
                            <div>
                              <h3 className="font-bold">{reputationData.ensName || truncateAddress(walletAddress)}</h3>
                              <p className="text-sm text-gray-400">Circle Trust Score: {reputationData.circleScore}%</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-orange-400">Atoms:</span> {reputationData.atoms}
                            </div>
                            <div>
                              <span className="text-yellow-400">Triples:</span> {reputationData.triples}
                            </div>
                            <div>
                              <span className="text-blue-400">Claims:</span> {reputationData.claims}
                            </div>
                            <div>
                              <span className="text-green-400">Upvotes:</span> {reputationData.upvoteClaims}
                            </div>
                          </div>
                          <div className="bg-gray-800/50 p-4 rounded-lg">
                            <p className="text-center">
                              <span className="text-purple-400 font-bold">
                                Your Trust Rating: {userTrustRating[0]}%
                              </span>
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Share on Twitter</Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-gray-600/50 text-gray-300 bg-transparent hover:bg-gray-800/50"
                            >
                              Copy Link
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showConnections} onOpenChange={setShowConnections}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                        >
                          <Network className="w-4 h-4 mr-2" />
                          Explore Connections
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700/50 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Circle Members & Trust Ratings</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            See how much your circle members trust this wallet:{" "}
                            {reputationData?.ensName || truncateAddress(walletAddress)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {circleMembers.map((member, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={member.pfp || "/placeholder.svg"}
                                  alt={member.name}
                                  className="w-12 h-12 rounded-full border-2 border-gray-700/50"
                                />
                                <div>
                                  <h4 className="font-medium text-white">{member.ensName || member.name}</h4>
                                  <p className="text-sm text-gray-400">Mutual Connection</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`text-lg font-bold ${
                                      member.trustPercentage >= 90
                                        ? "text-green-400"
                                        : member.trustPercentage >= 75
                                          ? "text-yellow-400"
                                          : member.trustPercentage >= 60
                                            ? "text-orange-400"
                                            : "text-red-400"
                                    }`}
                                  >
                                    {member.trustPercentage}%
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400">Trust Rating</div>
                                <div className="w-16 h-1 bg-gray-700 rounded-full mt-1">
                                  <div
                                    className={`h-full rounded-full ${
                                      member.trustPercentage >= 90
                                        ? "bg-green-400"
                                        : member.trustPercentage >= 75
                                          ? "bg-yellow-400"
                                          : member.trustPercentage >= 60
                                            ? "bg-orange-400"
                                            : "bg-red-400"
                                    }`}
                                    style={{ width: `${member.trustPercentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                            <h4 className="text-white font-medium mb-2">Trust Summary</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <div className="text-green-400 font-bold">
                                  {circleMembers.filter((m) => m.trustPercentage >= 90).length}
                                </div>
                                <div className="text-gray-400">High Trust (90%+)</div>
                              </div>
                              <div className="text-center">
                                <div className="text-yellow-400 font-bold">
                                  {
                                    circleMembers.filter((m) => m.trustPercentage >= 75 && m.trustPercentage < 90)
                                      .length
                                  }
                                </div>
                                <div className="text-gray-400">Medium Trust (75-89%)</div>
                              </div>
                              <div className="text-center">
                                <div className="text-orange-400 font-bold">
                                  {circleMembers.filter((m) => m.trustPercentage < 75).length}
                                </div>
                                <div className="text-gray-400">Lower Trust (&lt;75%)</div>
                              </div>
                            </div>
                            <div className="mt-3 text-center">
                              <div className="text-purple-400 font-bold">
                                {Math.round(
                                  circleMembers.reduce((sum, m) => sum + m.trustPercentage, 0) / circleMembers.length,
                                )}
                                %
                              </div>
                              <div className="text-gray-400 text-xs">Average Circle Trust</div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
