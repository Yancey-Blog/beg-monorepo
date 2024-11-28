/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AnnouncementModel = {
  __typename?: 'AnnouncementModel';
  _id: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weight: Scalars['Float']['output'];
};

export type ArchiveModel = {
  __typename?: 'ArchiveModel';
  _id: Scalars['Float']['output'];
  months: Array<MonthModel>;
};

export type BatchDeleteModel = {
  __typename?: 'BatchDeleteModel';
  deletedCount?: Maybe<Scalars['Float']['output']>;
  ids: Array<Scalars['ID']['output']>;
  n?: Maybe<Scalars['Float']['output']>;
  ok?: Maybe<Scalars['Float']['output']>;
};

export type BatchUpdateModel = {
  __typename?: 'BatchUpdateModel';
  ids: Array<Scalars['ID']['output']>;
  n?: Maybe<Scalars['Float']['output']>;
  nModified?: Maybe<Scalars['Float']['output']>;
  ok?: Maybe<Scalars['Float']['output']>;
};

export type BestAlbumModel = {
  __typename?: 'BestAlbumModel';
  _id: Scalars['ID']['output'];
  artist: Scalars['String']['output'];
  coverUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  mvUrl: Scalars['String']['output'];
  releaseDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CoverModel = {
  __typename?: 'CoverModel';
  _id: Scalars['ID']['output'];
  coverUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  isPublic: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weight: Scalars['Float']['output'];
};

/** The input type for creating an announcement. */
export type CreateAnnouncementInput = {
  /** Announcement content. */
  content: Scalars['String']['input'];
};

export type CreateBestAlbumInput = {
  artist: Scalars['String']['input'];
  coverUrl: Scalars['String']['input'];
  mvUrl: Scalars['String']['input'];
  releaseDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateCoverInput = {
  coverUrl: Scalars['String']['input'];
  isPublic: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type CreateLiveTourInput = {
  posterUrl: Scalars['String']['input'];
  showTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateMottoInput = {
  content: Scalars['String']['input'];
};

export type CreateOpenSourceInput = {
  description: Scalars['String']['input'];
  posterUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreatePlayerInput = {
  artist: Scalars['String']['input'];
  coverUrl: Scalars['String']['input'];
  isPublic: Scalars['Boolean']['input'];
  lrc: Scalars['String']['input'];
  musicFileUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastModifiedDate: Scalars['DateTime']['input'];
  posterUrl: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostStatisticsInput = {
  postId: Scalars['String']['input'];
  postName: Scalars['String']['input'];
  scenes: Scalars['String']['input'];
};

export type CreateYanceyMusicInput = {
  posterUrl: Scalars['String']['input'];
  releaseDate: Scalars['DateTime']['input'];
  soundCloudUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type DayModel = {
  __typename?: 'DayModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  pv: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type ExchangePositionInput = {
  exchangedId: Scalars['String']['input'];
  exchangedWeight: Scalars['Float']['input'];
  id: Scalars['String']['input'];
  weight: Scalars['Float']['input'];
};

export type GlobalSettingModel = {
  __typename?: 'GlobalSettingModel';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  cvPostId: Scalars['ID']['output'];
  isGrayTheme: Scalars['Boolean']['output'];
  releasePostId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LiveTourModel = {
  __typename?: 'LiveTourModel';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  posterUrl: Scalars['String']['output'];
  showTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MonthModel = {
  __typename?: 'MonthModel';
  days: Array<DayModel>;
  month: Scalars['Float']['output'];
};

export type MottoModel = {
  __typename?: 'MottoModel';
  _id: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weight: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnnouncement: AnnouncementModel;
  createBestAlbum: BestAlbumModel;
  createCover: CoverModel;
  createLiveTour: LiveTourModel;
  createMotto: MottoModel;
  createOpenSource: OpenSourceModel;
  createPlayer: PlayerModel;
  createPost: PostItemModel;
  createPostStatistics: PostStatisticsModel;
  createYanceyMusic: YanceyMusicModel;
  deleteAnnouncementById: AnnouncementModel;
  deleteAnnouncements: BatchDeleteModel;
  deleteBestAlbumById: BestAlbumModel;
  deleteBestAlbums: BatchDeleteModel;
  deleteCoverById: CoverModel;
  deleteCovers: BatchDeleteModel;
  deleteLiveTourById: LiveTourModel;
  deleteLiveTours: BatchDeleteModel;
  deleteMottoById: MottoModel;
  deleteMottos: BatchDeleteModel;
  deleteOpenSourceById: OpenSourceModel;
  deleteOpenSources: BatchDeleteModel;
  deletePlayerById: PlayerModel;
  deletePlayers: BatchDeleteModel;
  deletePostById: PostItemModel;
  deletePosts: BatchDeleteModel;
  deleteYanceyMusic: BatchDeleteModel;
  deleteYanceyMusicById: YanceyMusicModel;
  exchangePositionAnnouncement: Array<AnnouncementModel>;
  exchangePositionCover: Array<CoverModel>;
  exchangePositionMotto: Array<MottoModel>;
  exchangePositionPlayer: Array<PlayerModel>;
  offlinePlayers: BatchUpdateModel;
  publicCovers: BatchUpdateModel;
  updateAnnouncementById: AnnouncementModel;
  updateBestAlbumById: BestAlbumModel;
  updateCoverById: CoverModel;
  updateGlobalSettingById: GlobalSettingModel;
  updateLike: PostItemModel;
  updateLiveTourById: LiveTourModel;
  updateMottoById: MottoModel;
  updateOpenSourceById: OpenSourceModel;
  updatePV: PostItemModel;
  updatePlayerById: PlayerModel;
  updatePostById: PostItemModel;
  updateYanceyMusicById: YanceyMusicModel;
};


export type MutationCreateAnnouncementArgs = {
  input: CreateAnnouncementInput;
};


export type MutationCreateBestAlbumArgs = {
  input: CreateBestAlbumInput;
};


export type MutationCreateCoverArgs = {
  input: CreateCoverInput;
};


export type MutationCreateLiveTourArgs = {
  input: CreateLiveTourInput;
};


export type MutationCreateMottoArgs = {
  input: CreateMottoInput;
};


export type MutationCreateOpenSourceArgs = {
  input: CreateOpenSourceInput;
};


export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostStatisticsArgs = {
  input: CreatePostStatisticsInput;
};


export type MutationCreateYanceyMusicArgs = {
  input: CreateYanceyMusicInput;
};


export type MutationDeleteAnnouncementByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAnnouncementsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteBestAlbumByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBestAlbumsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteCoverByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCoversArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteLiveTourByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLiveToursArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteMottoByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMottosArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteOpenSourceByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOpenSourcesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeletePlayerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeletePostByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteYanceyMusicArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteYanceyMusicByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationExchangePositionAnnouncementArgs = {
  input: ExchangePositionInput;
};


export type MutationExchangePositionCoverArgs = {
  input: ExchangePositionInput;
};


export type MutationExchangePositionMottoArgs = {
  input: ExchangePositionInput;
};


export type MutationExchangePositionPlayerArgs = {
  input: ExchangePositionInput;
};


export type MutationOfflinePlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationPublicCoversArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationUpdateAnnouncementByIdArgs = {
  input: UpdateAnnouncementInput;
};


export type MutationUpdateBestAlbumByIdArgs = {
  input: UpdateBestAlbumInput;
};


export type MutationUpdateCoverByIdArgs = {
  input: UpdateCoverInput;
};


export type MutationUpdateGlobalSettingByIdArgs = {
  input: UpdateGlobalSettingInput;
};


export type MutationUpdateLikeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateLiveTourByIdArgs = {
  input: UpdateLiveTourInput;
};


export type MutationUpdateMottoByIdArgs = {
  input: UpdateMottoInput;
};


export type MutationUpdateOpenSourceByIdArgs = {
  input: UpdateOpenSourceInput;
};


export type MutationUpdatePvArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePlayerByIdArgs = {
  input: UpdatePlayerInput;
};


export type MutationUpdatePostByIdArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateYanceyMusicByIdArgs = {
  input: UpdateYanceyMusicInput;
};

export type OpenSourceModel = {
  __typename?: 'OpenSourceModel';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  posterUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type PaginationInput = {
  page: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
  tag?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PlayerModel = {
  __typename?: 'PlayerModel';
  _id: Scalars['ID']['output'];
  artist: Scalars['String']['output'];
  coverUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  isPublic: Scalars['Boolean']['output'];
  lrc: Scalars['String']['output'];
  musicFileUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weight: Scalars['Float']['output'];
};

export type PostItemModel = {
  __typename?: 'PostItemModel';
  _id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  isPublic: Scalars['Boolean']['output'];
  lastModifiedDate: Scalars['DateTime']['output'];
  like: Scalars['Int']['output'];
  next?: Maybe<PostItemModel>;
  posterUrl: Scalars['String']['output'];
  prev?: Maybe<PostItemModel>;
  pv: Scalars['Int']['output'];
  summary: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostModel = {
  __typename?: 'PostModel';
  items: Array<PostItemModel>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type PostStatisticsGroupItemModel = {
  __typename?: 'PostStatisticsGroupItemModel';
  operatedAt: Scalars['DateTime']['output'];
  postId: Scalars['String']['output'];
  postName: Scalars['String']['output'];
  scenes: Scalars['String']['output'];
};

export type PostStatisticsGroupModel = {
  __typename?: 'PostStatisticsGroupModel';
  _id: Scalars['String']['output'];
  count: Scalars['Float']['output'];
  items: Array<PostStatisticsGroupItemModel>;
};

export type PostStatisticsModel = {
  __typename?: 'PostStatisticsModel';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  postId: Scalars['String']['output'];
  postName: Scalars['String']['output'];
  scenes: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  archive: Array<ArchiveModel>;
  getAllPublicCovers: Array<CoverModel>;
  getAllTags: TagsModel;
  getAnnouncementById: AnnouncementModel;
  getAnnouncements: Array<AnnouncementModel>;
  getBanwagonServiceInfo: ServiceInfoModel;
  getBanwagonUsageStats: Array<UsageStatesModel>;
  getBestAlbumById: BestAlbumModel;
  getBestAlbums: Array<BestAlbumModel>;
  getCoverById: CoverModel;
  getCovers: Array<CoverModel>;
  getGlobalSetting: GlobalSettingModel;
  getLiveTourById: LiveTourModel;
  getLiveTours: Array<LiveTourModel>;
  getMottoById: MottoModel;
  getMottos: Array<MottoModel>;
  getOpenSourceById: OpenSourceModel;
  getOpenSources: Array<OpenSourceModel>;
  getPlayerById: PlayerModel;
  getPlayers: Array<PlayerModel>;
  getPostById: PostItemModel;
  getPostByIdForCMS: PostItemModel;
  getPostStatistics: Array<PostStatisticsGroupModel>;
  getPostsForCMS: PostModel;
  getTopLikePosts: Array<PostItemModel>;
  getTopPVPosts: Array<PostItemModel>;
  getYanceyMusic: Array<YanceyMusicModel>;
  getYanceyMusicById: YanceyMusicModel;
  players: Array<PlayerModel>;
  posts: PostModel;
};


export type QueryGetAnnouncementByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetBestAlbumByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCoverByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLiveTourByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMottoByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOpenSourceByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPlayerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostByIdForCmsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsForCmsArgs = {
  input: PaginationInput;
};


export type QueryGetTopLikePostsArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryGetTopPvPostsArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryGetYanceyMusicByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  input: PaginationInput;
};

export type ServiceInfoModel = {
  __typename?: 'ServiceInfoModel';
  available_isos: Array<Scalars['String']['output']>;
  data_counter: Scalars['Float']['output'];
  data_next_reset: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  error: Scalars['Float']['output'];
  free_ip_replacement_interval: Scalars['Float']['output'];
  hostname: Scalars['String']['output'];
  ip_addresses: Array<Scalars['String']['output']>;
  ip_nullroutes: Array<Scalars['String']['output']>;
  is_cpu_throttled: Scalars['String']['output'];
  is_disk_throttled: Scalars['String']['output'];
  iso1?: Maybe<Scalars['String']['output']>;
  iso2?: Maybe<Scalars['String']['output']>;
  live_hostname: Scalars['String']['output'];
  load_average: Scalars['String']['output'];
  location_ipv6_ready: Scalars['Boolean']['output'];
  location_private_network_available: Scalars['Boolean']['output'];
  max_abuse_points: Scalars['Float']['output'];
  mem_available_kb: Scalars['Float']['output'];
  monthly_data_multiplier: Scalars['Float']['output'];
  node_alias: Scalars['String']['output'];
  node_datacenter: Scalars['String']['output'];
  node_ip: Scalars['String']['output'];
  node_location: Scalars['String']['output'];
  node_location_id: Scalars['String']['output'];
  os: Scalars['String']['output'];
  plan: Scalars['String']['output'];
  plan_disk: Scalars['Float']['output'];
  plan_max_ipv6s: Scalars['Float']['output'];
  plan_monthly_data: Scalars['Float']['output'];
  plan_private_network_available: Scalars['Boolean']['output'];
  plan_ram: Scalars['Float']['output'];
  plan_swap: Scalars['Float']['output'];
  policy_violation: Scalars['Boolean']['output'];
  private_ip_addresses: Array<Scalars['String']['output']>;
  ptr: Scalars['String']['output'];
  rdns_api_available: Scalars['Boolean']['output'];
  ssh_port: Scalars['Float']['output'];
  suspended: Scalars['Boolean']['output'];
  suspension_count?: Maybe<Scalars['Float']['output']>;
  swap_available_kb: Scalars['Float']['output'];
  swap_total_kb: Scalars['Float']['output'];
  total_abuse_points: Scalars['Float']['output'];
  ve_disk_quota_gb: Scalars['String']['output'];
  ve_mac1: Scalars['String']['output'];
  ve_status: Scalars['String']['output'];
  ve_used_disk_space_b: Scalars['Float']['output'];
  veid: Scalars['Float']['output'];
  vm_type: Scalars['String']['output'];
};

export type TagsModel = {
  __typename?: 'TagsModel';
  tags: Array<Scalars['String']['output']>;
};

export type UpdateAnnouncementInput = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type UpdateBestAlbumInput = {
  artist: Scalars['String']['input'];
  coverUrl: Scalars['String']['input'];
  id: Scalars['String']['input'];
  mvUrl: Scalars['String']['input'];
  releaseDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type UpdateCoverInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGlobalSettingInput = {
  cvPostId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isGrayTheme?: InputMaybe<Scalars['Boolean']['input']>;
  releasePostId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLiveTourInput = {
  id: Scalars['String']['input'];
  posterUrl: Scalars['String']['input'];
  showTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type UpdateMottoInput = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type UpdateOpenSourceInput = {
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
  posterUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type UpdatePlayerInput = {
  artist?: InputMaybe<Scalars['String']['input']>;
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lrc?: InputMaybe<Scalars['String']['input']>;
  musicFileUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastModifiedDate?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['Float']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  pv?: InputMaybe<Scalars['Float']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateYanceyMusicInput = {
  id: Scalars['String']['input'];
  posterUrl: Scalars['String']['input'];
  releaseDate: Scalars['DateTime']['input'];
  soundCloudUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UsageStatesModel = {
  __typename?: 'UsageStatesModel';
  cpu_usage: Scalars['Float']['output'];
  disk_read_bytes: Scalars['Float']['output'];
  disk_write_bytes: Scalars['Float']['output'];
  network_in_bytes: Scalars['Float']['output'];
  network_out_bytes: Scalars['Float']['output'];
  timestamp: Scalars['Float']['output'];
};

export type YanceyMusicModel = {
  __typename?: 'YanceyMusicModel';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  posterUrl: Scalars['String']['output'];
  releaseDate: Scalars['DateTime']['output'];
  soundCloudUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};
