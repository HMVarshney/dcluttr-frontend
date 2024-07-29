"use client"

import { ArrowSquareOut, SquareHalf } from "phosphor-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Fragment, memo, useEffect, useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getAdsPlacementMeta } from "@/lib/store/features/metaAdsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import EditTableAttribution from "../../../performance/_components/EditTableAttribution";
import { Switch } from "@/components/ui/switch";
import IndeterminateCheckbox from "@/components/IndeterminateCheckbox"
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExportFileFormat from "@/components/ExportFileFormat";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"



let data = [
    {
        "id": "120207865184130487",
        "name": "SC_Reel_CHB_23Feb – Copy",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "video",
        "creative_link": "",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120207864993900487\"]&selected_ad_ids=120207865184130487",
        "ad_set_id": "120207864993900487",
        "campaign_id": "120207864993840487",
        "date.day": "2024-04-09T00:00:00.000",
        "date": "2024-04-09T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "167.38",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "0",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "41.845",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120209071860550487",
        "name": "Best_Seller_Catalogue",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120209071860540487\"]&selected_ad_ids=120209071860550487",
        "ad_set_id": "120209071860540487",
        "campaign_id": "120208858177230487",
        "date.day": "2024-05-14T00:00:00.000",
        "date": "2024-05-14T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "892.68",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "48",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "16.53111111111111",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120208650535750487",
        "name": "Influencer_Primer",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "video",
        "creative_link": "",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120208565645090487\"]&selected_ad_ids=120208650535750487",
        "ad_set_id": "120208565645090487",
        "campaign_id": "120208384791810487",
        "date.day": "2024-05-07T00:00:00.000",
        "date": "2024-05-07T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "901.1",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "18",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "32.18214285714286",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120207972119360487",
        "name": "Carousel – Copy",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "null",
        "creative_link": "null",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120207969995410487\"]&selected_ad_ids=120207972119360487",
        "ad_set_id": "120207969995410487",
        "campaign_id": "120207969995400487",
        "date.day": "2024-06-11T00:00:00.000",
        "date": "2024-06-11T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "54",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "0",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": null,
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210258888850487",
        "name": "Catalogue_All",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210258888860487\"]&selected_ad_ids=120210258888850487",
        "ad_set_id": "120210258888860487",
        "campaign_id": "120210258834670487",
        "date.day": "2024-06-27T00:00:00.000",
        "date": "2024-06-27T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "807.3",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "38",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "16.818749999999998",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210902192620487",
        "name": "Advantage+ shopping campaign 10/07/2024 Ad",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210902192630487\"]&selected_ad_ids=120210902192620487",
        "ad_set_id": "120210902192630487",
        "campaign_id": "120210902192610487",
        "date.day": "2024-07-25T00:00:00.000",
        "date": "2024-07-25T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "2542.9",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "82",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "24.930392156862744",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120207583983510487",
        "name": "Carousel-1 - Copy – Copy",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "video",
        "creative_link": "",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120207583676080487\"]&selected_ad_ids=120207583983510487",
        "ad_set_id": "120207583676080487",
        "campaign_id": "120207583675870487",
        "date.day": "2024-04-04T00:00:00.000",
        "date": "2024-04-04T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "1038.52",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "20",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "43.27166666666667",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210902218300487",
        "name": "Frame_Ad+",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210902218310487\"]&selected_ad_ids=120210902218300487",
        "ad_set_id": "120210902218310487",
        "campaign_id": "120210902218290487",
        "date.day": "2024-07-25T00:00:00.000",
        "date": "2024-07-25T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "2165.5",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "128",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "14.24671052631579",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120207866562520487",
        "name": "Reel - Sunny Eye Definers",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "video",
        "creative_link": "<iframe allow=\"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share\" allowfullscreen=\"true\" frameborder=\"0\" height=\"1350\" scrolling=\"no\" src=\"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F23850612024190486%2Fvideos%2F1427383218126973%2F%3Fidorvanity%3D23850612024190486&width=1080\" style=\"border:none;overflow:hidden\" width=\"1080\"></iframe>",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120207866562530487\"]&selected_ad_ids=120207866562520487",
        "ad_set_id": "120207866562530487",
        "campaign_id": "120207865468840487",
        "date.day": "2024-04-09T00:00:00.000",
        "date": "2024-04-09T00:00:00.000",
        "count": "2",
        "purchase_value_sum": "0",
        "ad_spend_sum": "977.5",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "16",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "14.81060606060606",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120207583517250487",
        "name": "SC_SingleImage2_27Feb24 – Lookalike",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-1.xx.fbcdn.net/v/t45.1600-4/429013893_120206044406610487_4319231264087638187_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=890911&_nc_ohc=ekbDGwlzipwQ7kNvgFp6YF8&_nc_ht=scontent-atl3-1.xx&edm=ALjApogEAAAA&oh=00_AYBsxDb9vP0jU2UPzEoPubB_ysOfKGBtTrlOnLryfnHrcA&oe=66AAD306",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120207583168990487\"]&selected_ad_ids=120207583517250487",
        "ad_set_id": "120207583168990487",
        "campaign_id": "120207583168940487",
        "date.day": "2024-04-13T00:00:00.000",
        "date": "2024-04-13T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "3.72",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "2",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "1.86",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210855526840487",
        "name": "KissMePink",
        "status": "PAUSED",
        "effective_status": "PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-2.xx.fbcdn.net/v/t45.1600-4/451835482_120210855506320487_508695054775471249_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=890911&_nc_ohc=4q70-1MEBBsQ7kNvgH6XCH2&_nc_ht=scontent-atl3-2.xx&edm=ALjApogEAAAA&oh=00_AYA6d1FQ5ipr61acF67iiNMQxatOGnVsHyUEBrMS6C7IUw&oe=66AAA343",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210855496290487\"]&selected_ad_ids=120210855526840487",
        "ad_set_id": "120210855496290487",
        "campaign_id": "120210855496270487",
        "date.day": "2024-07-25T00:00:00.000",
        "date": "2024-07-25T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "296.74",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "8",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "15.617894736842105",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210855521170487",
        "name": "RedCarpet",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-2.xx.fbcdn.net/v/t45.1600-4/452209554_120210855506420487_2629502834819625243_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=890911&_nc_ohc=rl6G_3X-8-YQ7kNvgGJjsiv&_nc_ht=scontent-atl3-2.xx&edm=ALjApogEAAAA&oh=00_AYApktHQH1ivS-Hib9vPoTrt2g8vMsXVu_g3VmlWBkt4nA&oe=66AA95DD",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210855496290487\"]&selected_ad_ids=120210855521170487",
        "ad_set_id": "120210855496290487",
        "campaign_id": "120210855496270487",
        "date.day": "2024-07-26T00:00:00.000",
        "date": "2024-07-26T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "316.33",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "7",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "35.147777777777776",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210855521170487",
        "name": "RedCarpet",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-2.xx.fbcdn.net/v/t45.1600-4/452209554_120210855506420487_2629502834819625243_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=890911&_nc_ohc=rl6G_3X-8-YQ7kNvgGJjsiv&_nc_ht=scontent-atl3-2.xx&edm=ALjApogEAAAA&oh=00_AYDmcmZVXbsz4T6Z83YSGIEJ6ejrCzM6lPaxqaQvGz--Yw&oe=66AACE1D",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210855496290487\"]&selected_ad_ids=120210855521170487",
        "ad_set_id": "120210855496290487",
        "campaign_id": "120210855496270487",
        "date.day": "2024-07-26T00:00:00.000",
        "date": "2024-07-26T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "316.33",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "7",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "35.147777777777776",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120208365099210487",
        "name": "New Sales ad",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-1.xx.fbcdn.net/v/t45.1600-4/434274947_120208365406930487_942793920432511957_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=890911&_nc_ohc=kmeOjT_I6z0Q7kNvgGmKsoR&_nc_ht=scontent-atl3-1.xx&edm=ALjApogEAAAA&oh=00_AYAJUHstQFbJxRJ641niXWRkuaI0B65phgSW7dD0W2QtSg&oe=66AA9062",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120208365098620487\"]&selected_ad_ids=120208365099210487",
        "ad_set_id": "120208365098620487",
        "campaign_id": "120208365096850487",
        "date.day": "2024-04-23T00:00:00.000",
        "date": "2024-04-23T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "97.93",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "4",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "13.99",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120208365099210487",
        "name": "New Sales ad",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-1.xx.fbcdn.net/v/t45.1600-4/434274947_120208365406930487_942793920432511957_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=890911&_nc_ohc=kmeOjT_I6z0Q7kNvgGmKsoR&_nc_ht=scontent-atl3-1.xx&edm=ALjApogEAAAA&oh=00_AYCbvCrmXoOgGErQRAniJc3rK9OVDZgDLI9bbKgsm-W2Hw&oe=66AAC8A2",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120208365098620487\"]&selected_ad_ids=120208365099210487",
        "ad_set_id": "120208365098620487",
        "campaign_id": "120208365096850487",
        "date.day": "2024-04-23T00:00:00.000",
        "date": "2024-04-23T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "97.93",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "4",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "13.99",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210855526840487",
        "name": "KissMePink",
        "status": "PAUSED",
        "effective_status": "PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-2.xx.fbcdn.net/v/t45.1600-4/451835482_120210855506320487_508695054775471249_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=890911&_nc_ohc=4q70-1MEBBsQ7kNvgH6XCH2&_nc_ht=scontent-atl3-2.xx&edm=ALjApogEAAAA&oh=00_AYCe4e4Sj42YqR5YvEKFgDvdAbhDqwh9fz9bio4OwDPV6w&oe=66AADB83",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210855496290487\"]&selected_ad_ids=120210855526840487",
        "ad_set_id": "120210855496290487",
        "campaign_id": "120210855496270487",
        "date.day": "2024-07-25T00:00:00.000",
        "date": "2024-07-25T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "296.74",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "8",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "15.617894736842105",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120207583517250487",
        "name": "SC_SingleImage2_27Feb24 – Lookalike",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-1.xx.fbcdn.net/v/t45.1600-4/429013893_120206044406610487_4319231264087638187_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=890911&_nc_ohc=ekbDGwlzipwQ7kNvgFp6YF8&_nc_ht=scontent-atl3-1.xx&edm=ALjApogEAAAA&oh=00_AYA5oB_LfeS4tnUGaNLWSfCC7N59vb_-ymfEwDgp9EUXXQ&oe=66AA9AC6",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120207583168990487\"]&selected_ad_ids=120207583517250487",
        "ad_set_id": "120207583168990487",
        "campaign_id": "120207583168940487",
        "date.day": "2024-04-13T00:00:00.000",
        "date": "2024-04-13T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "3.72",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "2",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "1.86",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": null,
        "name": null,
        "status": null,
        "effective_status": null,
        "creative_type": null,
        "creative_link": null,
        "link": null,
        "ad_set_id": null,
        "campaign_id": null,
        "date.day": "2024-06-28T00:00:00.000",
        "date": "2024-06-28T00:00:00.000",
        "count": "1",
        "purchase_value_sum": "0",
        "ad_spend_sum": "260.26",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "28",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "8.133125",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    }
]
const getCommonPinningStyles = (data) => {
    const { column } = data
    const isPinned = column.getIsPinned()

    // console.log(data.getContext());
    return {
        boxShadow: column.id === 'name' ? '-1px 0 1px -1px gray inset' : undefined,
        left: isPinned === 'left' ? column.getStart('left') : undefined,
        opacity: isPinned ? 1 : 1,
        position: isPinned ? 'sticky' : 'relative',
        width: column.getSize(),
        zIndex: isPinned ? 1 : 0,
        background: isPinned === 'left' ? '#ffffff' : undefined,
    }
}

export default function AnalyticsTable({ isLoading, annotation }) {
    const isOpen = useSelector((state) => state.user.sideBarClose);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });

    const handlePageSizeChange = (value) => {
        setPagination((current) => ({
            ...current,
            pageSize: parseInt(value, 10),
        }));
    };
    return (
        <div className={cn(' w-[calc(100vw-332px)]', { 'w-[calc(100vw-174px)]': isOpen })}>
            <div className='flex items-center justify-center gap-2 p-6'>
                <Input
                    className="w-[313px]"
                    value={""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="🔍 Search for metric"
                />
                <Select>
                    <SelectTrigger className="w-[140px] ">
                        <SelectValue placeholder="View by 1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="O-1">View by 1</SelectItem>
                        <SelectItem value="O-2">View by 2</SelectItem>
                        <SelectItem value="O-3">View by 3</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[190px]">
                        <SelectValue placeholder="Descending" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="O-1">Descending 1</SelectItem>
                        <SelectItem value="O-2">Descending 2</SelectItem>
                        <SelectItem value="O-3">Descending 3</SelectItem>
                    </SelectContent>
                </Select>
                <div className='flex-1'></div>
                <EditTableAttribution>
                    <Button variant="outline" className="px-2.5">
                        <SquareHalf className='w-5 h-5' />
                    </Button>
                </EditTableAttribution>
                <ExportFileFormat />
                <Select value={pagination?.pageSize} defaultValue={pagination?.pageSize} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-[100px] ">
                        <SelectValue placeholder={"3"} />
                    </SelectTrigger>
                    <SelectContent>
                        {[2, 3, 6].map((pageSize) => (
                            <SelectItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="px-6 pb-8 w-full">
                <Tables isLoading={isLoading} annotation={annotation} data={data} pagination={pagination} setPagination={setPagination} />
            </div>
        </div>
    )
}


export function Tables({ isLoading, annotation = {}, data = [], pagination, setPagination }) {
    const columns = useMemo(() => {
        return Object.entries(annotation.measures ?? {}).map(([key, value]) => ({
            accessorKey: key,
            header: <div className="min-w-32">{value.shortTitle || value.title}</div>,
            cell: (info) => <div className="min-w-32">{info.getValue()}</div>,
        }));
    }, [annotation]);

    const transformedData = useMemo(() => data, [data]);
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState([])

    // const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: transformedData || [],
        columns: [
            {
                accessorKey: 'name',
                header: ({ table, column }) => (
                    <div className="flex items-center gap-4">
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler(),
                            }}
                        />
                        <div
                            className="w-72 flex items-center justify-start text-sm"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Product
                            <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
                        </div>
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-4">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                        <div
                            className={cn('w-72 flex items-center gap-2',
                                { "pl-4": row.depth === 1 },
                                { "pl-8": row.depth === 2 },
                            )}
                            {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: { cursor: 'pointer' },
                            }}
                        >
                            <Image
                                src={"/logoIcon.svg"}
                                alt={row.getValue("name")}
                                width={40}
                                height={40}
                                className="rounded-full min-w-10"
                            />
                            <div className="font-semibold ">
                                <span className="line-clamp-1">
                                    {row.getValue("name")}
                                </span>
                                Deep Purple 4.2g
                            </div>
                        </div>
                    </div>
                ),
                // footer: props => props.column.id,
            },
            {
                header: "Ad Spend Sum",
                accessorKey: "ad_spend_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Purchase Sum",
                accessorKey: "purchase_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Impressions Sum",
                accessorKey: "impressions_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Clicks Sum",
                accessorKey: "clicks_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Vtc Sum",
                accessorKey: "vtc_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Ctr",
                accessorKey: "ctr",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Cpc",
                accessorKey: "cpc",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Cpm",
                accessorKey: "cpm",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Roas",
                accessorKey: "roas",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Aov",
                accessorKey: "aov",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Cpa",
                accessorKey: "cpa",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            ...columns,
        ],
        state: {
            sorting,
            rowSelection,
            pagination,
            columnPinning: {
                left: ['id', 'name'],
            },
        },
        getSubRows: row => row.subRows,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
    })

    const { pageIndex, pageSize } = pagination;
    const pageNumbers = useMemo(() => {
        const totalPages = table.getPageCount();
        let pages = [];
        let leftSide = pageIndex - 2;
        if (leftSide <= 2) {
            leftSide = 1;
        } else if (pageIndex > totalPages - 4) {
            leftSide = totalPages - 4;
        }
        let rightSide = pageIndex + 2;
        if (rightSide > totalPages - 2) {
            rightSide = totalPages;
        } else if (pageIndex < 3) {
            rightSide = 5;
        }
        for (let number = leftSide; number <= rightSide; number++) {
            if (number > 0 && number <= totalPages) {
                pages.push(number);
            }
        }
        return pages;
    }, [pageIndex, table.getPageCount()]);
    const handlePreviousPage = () => {
        setPagination((current) => ({
            ...current,
            pageIndex: current.pageIndex > 0 ? current.pageIndex - 1 : 0,
        }));
    };
    const handleNextPage = () => {
        setPagination((current) => ({
            ...current,
            pageIndex: current.pageIndex < table.getPageCount() - 1 ? current.pageIndex + 1 : current.pageIndex,
        }));
    };

    const handlePageNumberClick = (page) => {
        setPagination((current) => ({
            ...current,
            pageIndex: page - 1,
        }));
    };
    return (
        <>
            <div className="rounded-md overflow-hidden border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
                {(isLoading) ?
                    <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
                    : <Table className="rounded-md bg-white text-sm " >
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}
                                                style={{ ...getCommonPinningStyles(header) }}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={cn("text-[#4E5E5A]",
                                            { "bg-[#e5ede93a] hover:bg-[#e5ede9a8]": row.depth === 1 },
                                            { "bg-[#e5ede9a8] hover:bg-[#e5ede9c6]": row.depth === 2 },
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}
                                                style={{ ...getCommonPinningStyles(cell) }}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>}
            </div>
            <Pagination className={"mt-4"}>
                <PaginationContent>
                    <PaginationPrevious onClick={handlePreviousPage} disabled={pageIndex === 0} />
                    {pageNumbers.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink onClick={() => handlePageNumberClick(page)} isActive={pageIndex + 1 === page}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationNext onClick={handleNextPage} disabled={pageIndex >= table.getPageCount() - 1} />
                </PaginationContent>
            </Pagination>
        </>
    );
}
